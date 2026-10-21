'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Save,
  Send,
  Loader2,
  Image as ImageIcon,
  AlertCircle,
  Clock,
  Sparkles,
  Flame,
  CheckCircle,
  Wand2,
  X,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Video,
  Eye,
} from 'lucide-react';
import { useToast } from '@/components/admin/ToastContext';
import {
  buildImageMediaBlockHtml,
  buildYouTubeMediaBlockHtml,
  cleanContentForStorage,
  prepareContentForEditor,
  extractYouTubeId,
  isYouTubeShortsUrl,
  isValidImageUrl,
  renderContentToHtml,
} from '@/lib/contentFormatter';

interface CategoryOption {
  _id: string;
  name: string;
  slug: string;
}

interface PostInitialData {
  _id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  categoryId?: string | { _id: string; name: string };
  category?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  tags?: string[];
  status?: 'draft' | 'published' | 'archived';
  isFeatured?: boolean;
  isTrending?: boolean;
  readTimeMinutes?: number;
}

interface PostEditorProps {
  initialData?: PostInitialData;
  isEditMode?: boolean;
}

export function PostEditor({ initialData, isEditMode = false }: PostEditorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  // Check for AI-prefilled content from URL params
  const aiTitle = searchParams.get('ai_title') || '';
  const aiContent = searchParams.get('ai_content') || '';
  const aiExcerpt = searchParams.get('ai_excerpt') || '';
  const aiTags = searchParams.get('ai_tags') || '';
  const hasAIContent = !isEditMode && (!!aiTitle || !!aiContent);

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Form State — pre-fill from AI params if available
  const [title, setTitle] = useState(initialData?.title || aiTitle || '');
  const [slug, setSlug] = useState(initialData?.slug || (aiTitle ? generateSlugStatic(aiTitle) : ''));
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || aiExcerpt || '');
  const [content, setContent] = useState(initialData?.content || aiContent || '');
  const [categoryId, setCategoryId] = useState<string>(
    typeof initialData?.categoryId === 'object'
      ? initialData?.categoryId?._id
      : initialData?.categoryId || ''
  );
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || '');
  const [thumbnailAlt, setThumbnailAlt] = useState(initialData?.thumbnailAlt || '');
  const [tagsInput, setTagsInput] = useState(initialData?.tags?.join(', ') || aiTags || '');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>(
    initialData?.status || 'draft'
  );
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? false);
  const [isTrending, setIsTrending] = useState(initialData?.isTrending ?? false);
  const [readTimeMinutes, setReadTimeMinutes] = useState(initialData?.readTimeMinutes ?? 5);
  const [showAIBanner, setShowAIBanner] = useState(hasAIContent);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Visual Editor State
  const [editorMode, setEditorMode] = useState<'visual' | 'code' | 'preview'>('visual');
  const [uploadingImage, setUploadingImage] = useState(false);

  const visualEditorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inContentImageInputRef = useRef<HTMLInputElement>(null);
  const draggingBlockRef = useRef<HTMLElement | null>(null);
  const isInternalChangeRef = useRef(false);

  // Static slug generator (used for initial state before hooks run)
  function generateSlugStatic(str: string) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  const generateSlug = (str: string) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  // Fetch categories
  useEffect(() => {
    fetch('/api/admin/categories?limit=100&status=active')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setCategories(json.data);
          if (!categoryId && json.data.length > 0) {
            setCategoryId(json.data[0]._id);
          }
        }
      })
      .catch((err) => console.error('Error fetching categories:', err))
      .finally(() => setLoadingCategories(false));
  }, [categoryId]);

  // Synchronize ContentEditable DOM when editorMode switches or content loads
  useEffect(() => {
    if (editorMode === 'visual' && visualEditorRef.current) {
      if (!isInternalChangeRef.current) {
        visualEditorRef.current.innerHTML = prepareContentForEditor(content || '');
      }
    }
    isInternalChangeRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorMode]);

  // Initial populate for visual editor
  useEffect(() => {
    if (visualEditorRef.current && content && !visualEditorRef.current.innerHTML) {
      visualEditorRef.current.innerHTML = prepareContentForEditor(content);
    }
  }, [content]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditMode) {
      setSlug(generateSlug(val));
    }
  };

  function handleVisualEditorInput() {
    if (!visualEditorRef.current) return;
    const html = visualEditorRef.current.innerHTML;
    isInternalChangeRef.current = true;
    setContent(html);
  }

  function handleModeSwitch(targetMode: 'visual' | 'code' | 'preview') {
    if (targetMode === editorMode) return;
    if (editorMode === 'visual' && visualEditorRef.current) {
      setContent(cleanContentForStorage(visualEditorRef.current.innerHTML));
    }
    setEditorMode(targetMode);
  }

  function insertContentIntoEditor(htmlToInsert: string) {
    if (editorMode === 'visual' && visualEditorRef.current) {
      visualEditorRef.current.focus();
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0 && visualEditorRef.current.contains(sel.getRangeAt(0).commonAncestorContainer)) {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlToInsert;
        const frag = document.createDocumentFragment();
        let node;
        let lastNode: Node | null = null;
        while ((node = tempDiv.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);
        if (lastNode) {
          const newRange = range.cloneRange();
          newRange.setStartAfter(lastNode);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
        }
      } else {
        visualEditorRef.current.innerHTML += htmlToInsert;
      }
      handleVisualEditorInput();
    } else {
      setContent((prev) => (prev || '') + '\n' + cleanContentForStorage(htmlToInsert));
    }
  }

  async function uploadImageFile(file: File) {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error(`Ảnh "${file.name}" vượt quá giới hạn 5MB.`);
      return;
    }
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (file.type && !allowedMimes.includes(file.type)) {
      toast.error(`Định dạng "${file.type}" không hỗ trợ. Cho phép: JPG, PNG, WEBP, GIF.`);
      return;
    }

    const uploadId = 'media_up_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    let previewUrl = '';
    try {
      previewUrl = URL.createObjectURL(file);
    } catch (e) {
      previewUrl = '';
    }

    const previewBlockHtml = `
<figure id="${uploadId}" class="media-block media-block-image is-uploading is-selected" data-media-type="image" data-upload-id="${uploadId}" style="max-width:100%;width:100%;margin:2rem auto;text-align:center;position:relative;" contenteditable="false">
  <header class="media-block-toolbar" contenteditable="false">
    <div class="media-toolbar-group">
      <span class="media-drag-handle" title="Kéo để đổi vị trí" draggable="true">⠿ Kéo</span>
      <button type="button" class="media-btn media-move-up" title="Di chuyển ảnh lên trên đoạn văn trước">▲ Lên</button>
      <button type="button" class="media-btn media-move-down" title="Di chuyển ảnh xuống dưới đoạn văn sau">▼ Xuống</button>
    </div>
    <div class="media-toolbar-group" title="Phóng to / thu nhỏ ảnh">
      <button type="button" class="media-btn media-size-btn" data-size="25" title="Kích thước 25%">25%</button>
      <button type="button" class="media-btn media-size-btn" data-size="50" title="Kích thước 50%">50%</button>
      <button type="button" class="media-btn media-size-btn" data-size="75" title="Kích thước 75%">75%</button>
      <button type="button" class="media-btn media-size-btn" data-size="100" title="Kích thước 100%">100%</button>
      <button type="button" class="media-btn media-zoom-out" title="Thu nhỏ bớt ảnh">➖</button>
      <button type="button" class="media-btn media-zoom-in" title="Phóng to thêm ảnh">➕</button>
    </div>
    <div class="media-toolbar-group">
      <button type="button" class="media-btn media-align-left" data-align-btn="left" title="Căn lề trái">Trái</button>
      <button type="button" class="media-btn media-align-center active" data-align-btn="center" title="Căn lề giữa">Giữa</button>
      <button type="button" class="media-btn media-align-right" data-align-btn="right" title="Căn lề phải">Phải</button>
    </div>
    <button type="button" class="media-btn media-delete-btn" title="Xóa ảnh này khỏi bài viết">🗑️ Xóa</button>
  </header>
  <div class="media-image-wrapper" style="position:relative;display:inline-block;width:100%;max-width:100%;">
    <img src="${previewUrl}" alt="${file.name || 'Ảnh bài viết'}" style="width:100%;height:auto;border-radius:10px;display:block;box-shadow:0 4px 12px rgba(0,0,0,0.3);opacity:0.85;" />
    <span class="media-resize-handle media-resize-se" data-handle="se" title="Kéo góc này để phóng to / thu nhỏ ảnh"></span>
    <span class="media-resize-handle media-resize-sw" data-handle="sw" title="Kéo góc này để phóng to / thu nhỏ ảnh"></span>
    <div class="media-upload-overlay" contenteditable="false">
      <span class="animate-spin inline-block w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full"></span>
      <span>Đang tải ảnh lên cloud storage...</span>
    </div>
  </div>
  <figcaption class="media-caption" style="text-align:center;font-size:0.85rem;color:#a1a1aa;margin-top:0.5rem;font-style:italic;">
    ${file.name || 'Ảnh minh họa'}
  </figcaption>
</figure><p><br></p>
`;

    insertContentIntoEditor(previewBlockHtml);
    setUploadingImage(true);

    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Không thể đọc file ảnh.'));
        reader.readAsDataURL(file);
      });
      const base64Data = await base64Promise;

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Data,
          fileName: file.name,
          mimeType: file.type,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Lỗi khi upload ảnh.');
      }

      const cloudUrl = json.data?.url;
      if (cloudUrl) {
        if (editorMode === 'visual' && visualEditorRef.current) {
          const blockEl = visualEditorRef.current.querySelector(`#${uploadId}`);
          if (blockEl) {
            const img = blockEl.querySelector('img');
            if (img) {
              img.src = cloudUrl;
              img.style.opacity = '1';
            }
            const overlay = blockEl.querySelector('.media-upload-overlay');
            if (overlay) overlay.remove();
            blockEl.classList.remove('is-uploading');
            handleVisualEditorInput();
          }
        } else {
          setContent((prev) => {
            const current = prev || '';
            const replaced = previewUrl ? current.replace(previewUrl, cloudUrl) : current;
            return cleanContentForStorage(replaced);
          });
        }
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        toast.success(`Đã tải lên ảnh "${file.name}" thành công!`);
      }
    } catch (err: any) {
      console.error('[Upload Error]', err);
      if (editorMode === 'visual' && visualEditorRef.current) {
        const blockEl = visualEditorRef.current.querySelector(`#${uploadId}`);
        if (blockEl) {
          const overlay = blockEl.querySelector('.media-upload-overlay');
          if (overlay) {
            overlay.className = 'media-upload-error';
            overlay.innerHTML = `<span>⚠️ Tải ảnh thất bại: ${err.message}</span> <button type="button" class="px-2 py-1 bg-zinc-800 text-xs rounded hover:bg-zinc-700" onclick="this.closest('.media-block').remove()">Xóa</button>`;
          }
        }
      }
      toast.error(`Không thể tải ảnh: ${err.message}. Văn bản vẫn được giữ an toàn.`);
    } finally {
      setUploadingImage(false);
    }
  }

  function handleInsertYouTube(targetUrl?: string) {
    const url =
      targetUrl ||
      prompt(
        'Dán đường link YouTube (https://www.youtube.com/watch?v=... hoặc https://youtu.be/... hoặc shorts):'
      );
    if (!url || typeof url !== 'string' || !url.trim()) return;

    const trimmed = url.trim();
    const ytId = extractYouTubeId(trimmed);

    if (!ytId) {
      toast.warning('Không tìm thấy Video ID YouTube hợp lệ. Đã chèn dưới dạng liên kết.');
      insertContentIntoEditor(
        `<p><a href="${trimmed}" target="_blank" rel="noopener noreferrer">${trimmed}</a></p><p><br></p>`
      );
      return;
    }

    const isShorts = isYouTubeShortsUrl(trimmed);
    const embedHtml =
      buildYouTubeMediaBlockHtml({ videoId: ytId, isShorts, isInteractive: true }) + '<p><br></p>';
    insertContentIntoEditor(embedHtml);
    toast.success('Đã nhúng khối video YouTube thành công!');
  }

  function handleInsertImageUrl() {
    const url = prompt('Nhập đường link trực tiếp của ảnh (https://...):');
    if (!url || typeof url !== 'string' || !url.trim()) return;

    const trimmed = url.trim();
    if (!isValidImageUrl(trimmed)) {
      toast.warning('Đường link không có đuôi ảnh hợp lệ. Đã chèn dạng liên kết.');
      insertContentIntoEditor(
        `<p><a href="${trimmed}" target="_blank" rel="noopener noreferrer">${trimmed}</a></p><p><br></p>`
      );
      return;
    }

    const imageHtml =
      buildImageMediaBlockHtml({ url: trimmed, alt: 'Minh họa bài viết', isInteractive: true }) +
      '<p><br></p>';
    insertContentIntoEditor(imageHtml);
    toast.success('Đã chèn khối hình ảnh thành công!');
  }

  // Scan and automatically wrap any plain <img> that enters the editor
  function autoWrapUnwrappedImages() {
    if (!visualEditorRef.current) return;
    const imgs = visualEditorRef.current.querySelectorAll('img');
    let hasChanges = false;
    imgs.forEach((img) => {
      if (!img.closest('.media-block')) {
        const src = img.getAttribute('src') || '';
        const alt = img.getAttribute('alt') || 'Ảnh minh họa';
        if (src) {
          const wrapper = document.createElement('div');
          wrapper.innerHTML = buildImageMediaBlockHtml({ url: src, alt, isInteractive: true });
          const newBlock = wrapper.firstElementChild;
          if (newBlock) {
            const parentP = img.closest('p');
            if (parentP && parentP.children.length === 1 && !parentP.textContent?.trim()) {
              parentP.replaceWith(newBlock);
            } else {
              img.replaceWith(newBlock);
            }
            hasChanges = true;
          }
        }
      }
    });
    if (hasChanges) {
      handleVisualEditorInput();
    }
  }

  function handleVisualEditorClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (!visualEditorRef.current) return;

    // 1. Delete button 🗑️
    const deleteBtn = target.closest('.media-delete-btn');
    if (deleteBtn) {
      e.preventDefault();
      e.stopPropagation();
      const block = deleteBtn.closest('.media-block');
      if (block) {
        block.remove();
        handleVisualEditorInput();
        toast.info('Đã xóa khối media.');
      }
      return;
    }

    // 2. Move Up button ▲
    const moveUpBtn = target.closest('.media-move-up');
    if (moveUpBtn) {
      e.preventDefault();
      e.stopPropagation();
      const block = moveUpBtn.closest('.media-block');
      if (block && block.previousElementSibling) {
        visualEditorRef.current.insertBefore(block, block.previousElementSibling);
        handleVisualEditorInput();
        toast.success('Đã di chuyển ảnh lên trên!');
      }
      return;
    }

    // 3. Move Down button ▼
    const moveDownBtn = target.closest('.media-move-down');
    if (moveDownBtn) {
      e.preventDefault();
      e.stopPropagation();
      const block = moveDownBtn.closest('.media-block');
      if (block && block.nextElementSibling) {
        visualEditorRef.current.insertBefore(block, block.nextElementSibling.nextElementSibling);
        handleVisualEditorInput();
        toast.success('Đã di chuyển ảnh xuống dưới!');
      }
      return;
    }

    // 4. Quick Size buttons (25%, 50%, 75%, 100%)
    const sizeBtn = target.closest('.media-size-btn') as HTMLElement;
    if (sizeBtn) {
      e.preventDefault();
      e.stopPropagation();
      const block = sizeBtn.closest('.media-block-image') as HTMLElement;
      if (block) {
        const percent = parseInt(sizeBtn.dataset.size || '100', 10);
        block.style.maxWidth = `${percent}%`;
        block.style.width = `${percent}%`;
        block.dataset.width = `${percent}%`;
        handleVisualEditorInput();
        toast.success(`Đã đổi kích thước ảnh sang ${percent}%!`);
      }
      return;
    }

    // 5. Zoom out / Zoom in buttons
    const zoomOutBtn = target.closest('.media-zoom-out');
    if (zoomOutBtn) {
      e.preventDefault();
      e.stopPropagation();
      const block = zoomOutBtn.closest('.media-block-image') as HTMLElement;
      if (block) {
        const currentW = block.offsetWidth;
        const newW = Math.max(120, Math.round(currentW * 0.85));
        block.style.maxWidth = `${newW}px`;
        block.style.width = '100%';
        block.dataset.width = String(newW);
        handleVisualEditorInput();
        toast.info(`Đã thu nhỏ ảnh (${newW}px)`);
      }
      return;
    }

    const zoomInBtn = target.closest('.media-zoom-in');
    if (zoomInBtn) {
      e.preventDefault();
      e.stopPropagation();
      const block = zoomInBtn.closest('.media-block-image') as HTMLElement;
      if (block) {
        const currentW = block.offsetWidth;
        const editorW = visualEditorRef.current.clientWidth || 800;
        const newW = Math.min(editorW, Math.round(currentW * 1.15));
        block.style.maxWidth = `${newW}px`;
        block.style.width = '100%';
        block.dataset.width = String(newW);
        handleVisualEditorInput();
        toast.info(`Đã phóng to ảnh (${newW}px)`);
      }
      return;
    }

    // 6. Alignment buttons (Left, Center, Right)
    const alignBtn = target.closest('[data-align-btn]') as HTMLElement;
    if (alignBtn) {
      e.preventDefault();
      e.stopPropagation();
      const block = alignBtn.closest('.media-block-image') as HTMLElement;
      if (block) {
        const align = alignBtn.dataset.alignBtn || 'center';
        block.dataset.align = align;
        block.style.textAlign = align;
        if (align === 'left') {
          block.style.margin = '2rem auto 2rem 0';
        } else if (align === 'right') {
          block.style.margin = '2rem 0 2rem auto';
        } else {
          block.style.margin = '2rem auto';
        }
        const allAlignBtns = block.querySelectorAll('[data-align-btn]');
        allAlignBtns.forEach((btn) => {
          btn.classList.toggle('active', (btn as HTMLElement).dataset.alignBtn === align);
        });
        handleVisualEditorInput();
      }
      return;
    }

    // 7. Select block on click
    const mediaBlock = target.closest('.media-block') as HTMLElement;
    const allBlocks = visualEditorRef.current.querySelectorAll('.media-block');
    if (mediaBlock) {
      allBlocks.forEach((b) => {
        if (b !== mediaBlock) b.classList.remove('is-selected');
      });
      mediaBlock.classList.add('is-selected');
    } else {
      allBlocks.forEach((b) => b.classList.remove('is-selected'));
    }
  }

  function handleVisualEditorKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!visualEditorRef.current) return;
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const selectedBlock = visualEditorRef.current.querySelector('.media-block.is-selected');
      if (selectedBlock) {
        e.preventDefault();
        selectedBlock.remove();
        handleVisualEditorInput();
        toast.info('Đã xóa khối media.');
      }
    }
  }

  function handleVisualEditorMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    const handle = (e.target as HTMLElement).closest('.media-resize-handle') as HTMLElement;
    if (!handle || !visualEditorRef.current) return;

    e.preventDefault();
    e.stopPropagation();

    const block = handle.closest('.media-block-image') as HTMLElement;
    if (!block) return;

    const startX = e.clientX;
    const initialRect = block.getBoundingClientRect();
    const startWidth = initialRect.width;
    const isLeft = handle.dataset.handle === 'sw';

    function onMouseMove(moveEvent: MouseEvent) {
      const deltaX = moveEvent.clientX - startX;
      let newWidth = isLeft ? startWidth - deltaX : startWidth + deltaX;
      const editorWidth = visualEditorRef.current?.clientWidth || 800;
      newWidth = Math.max(120, Math.min(editorWidth, Math.round(newWidth)));

      block.style.maxWidth = `${newWidth}px`;
      block.style.width = '100%';
      block.dataset.width = String(newWidth);
    }

    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      handleVisualEditorInput();
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    const handle = (e.target as HTMLElement).closest('.media-drag-handle');
    if (!handle) return;
    const block = handle.closest('.media-block') as HTMLElement;
    if (!block) return;

    draggingBlockRef.current = block;
    block.classList.add('is-dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', block.id || 'media-block');
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    if (!draggingBlockRef.current || !visualEditorRef.current) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    const targetChild = (e.target as HTMLElement).closest(
      '.blogweb-visual-editor > *'
    ) as HTMLElement;
    if (!targetChild || targetChild === draggingBlockRef.current) return;

    visualEditorRef.current
      .querySelectorAll('.drop-indicator-top, .drop-indicator-bottom')
      .forEach((el) => {
        if (el !== targetChild) {
          el.classList.remove('drop-indicator-top', 'drop-indicator-bottom');
        }
      });

    const rect = targetChild.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    if (e.clientY < midY) {
      targetChild.classList.add('drop-indicator-top');
      targetChild.classList.remove('drop-indicator-bottom');
    } else {
      targetChild.classList.add('drop-indicator-bottom');
      targetChild.classList.remove('drop-indicator-top');
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (target.classList) {
      target.classList.remove('drop-indicator-top', 'drop-indicator-bottom');
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    if (!draggingBlockRef.current || !visualEditorRef.current) return;
    e.preventDefault();

    const targetChild = (e.target as HTMLElement).closest(
      '.blogweb-visual-editor > *'
    ) as HTMLElement;
    const draggedEl = draggingBlockRef.current;

    visualEditorRef.current
      .querySelectorAll('.drop-indicator-top, .drop-indicator-bottom')
      .forEach((el) => {
        el.classList.remove('drop-indicator-top', 'drop-indicator-bottom');
      });

    if (targetChild && targetChild !== draggedEl) {
      const rect = targetChild.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      if (e.clientY < midY) {
        visualEditorRef.current.insertBefore(draggedEl, targetChild);
      } else {
        visualEditorRef.current.insertBefore(draggedEl, targetChild.nextSibling);
      }
      handleVisualEditorInput();
      toast.success('Đã chuyển vị trí khối media!');
    }

    draggedEl.classList.remove('is-dragging');
    draggingBlockRef.current = null;
  }

  function handleDragEnd() {
    if (draggingBlockRef.current) {
      draggingBlockRef.current.classList.remove('is-dragging');
      draggingBlockRef.current = null;
    }
    if (visualEditorRef.current) {
      visualEditorRef.current
        .querySelectorAll('.drop-indicator-top, .drop-indicator-bottom')
        .forEach((el) => {
          el.classList.remove('drop-indicator-top', 'drop-indicator-bottom');
        });
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const clipboardData = e.clipboardData;
    if (!clipboardData) return;

    // 1. Image files pasted from clipboard
    const imageFiles: File[] = [];
    if (clipboardData.files && clipboardData.files.length > 0) {
      for (let i = 0; i < clipboardData.files.length; i++) {
        const f = clipboardData.files[i];
        if (f.type && f.type.startsWith('image/')) imageFiles.push(f);
      }
    }
    if (imageFiles.length === 0 && clipboardData.items && clipboardData.items.length > 0) {
      for (let i = 0; i < clipboardData.items.length; i++) {
        const item = clipboardData.items[i];
        if (item.type && item.type.startsWith('image/')) {
          const f = item.getAsFile();
          if (f) imageFiles.push(f);
        }
      }
    }

    if (imageFiles.length > 0) {
      e.preventDefault();
      for (const file of imageFiles) {
        uploadImageFile(file);
      }
      return;
    }

    // 2. HTML data with <img> tag copied from another tab or document
    const htmlData = clipboardData.getData('text/html');
    if (htmlData && htmlData.includes('<img')) {
      const match = htmlData.match(/<img\b[^>]*src=["']([^"']+)["'][^>]*>/i);
      if (match && match[1]) {
        e.preventDefault();
        const src = match[1];
        const altMatch = htmlData.match(/alt=["']([^"']*)["']/i);
        const alt = altMatch ? altMatch[1] : 'Ảnh dán';
        const imgBlock =
          buildImageMediaBlockHtml({ url: src, alt, isInteractive: true }) + '<p><br></p>';
        insertContentIntoEditor(imgBlock);
        toast.success('Đã chuyển ảnh dán thành khối ảnh tương tác!');
        return;
      }
    }

    // 3. Standalone YouTube or Image URL
    const textData = (clipboardData.getData('text/plain') || '').trim();
    if (
      textData &&
      (textData.startsWith('http://') || textData.startsWith('https://')) &&
      !textData.includes('\n')
    ) {
      const ytId = extractYouTubeId(textData);
      if (ytId) {
        e.preventDefault();
        handleInsertYouTube(textData);
        return;
      }
      if (isValidImageUrl(textData)) {
        e.preventDefault();
        const imgHtml =
          buildImageMediaBlockHtml({
            url: textData,
            alt: 'Ảnh dán từ clipboard',
            isInteractive: true,
          }) + '<p><br></p>';
        insertContentIntoEditor(imgHtml);
        toast.success('Đã chuyển đường link ảnh thành khối ảnh trực tiếp!');
        return;
      }
    }

    // 4. Default paste fallback: trigger autoWrap check after paste settles
    setTimeout(() => {
      autoWrapUnwrappedImages();
    }, 100);
  }

  function handleToolbarFormat(action: string) {
    if (editorMode === 'visual') {
      visualEditorRef.current?.focus();
      switch (action) {
        case 'bold':
          document.execCommand('bold', false, undefined);
          break;
        case 'italic':
          document.execCommand('italic', false, undefined);
          break;
        case 'underline':
          document.execCommand('underline', false, undefined);
          break;
        case 'h2':
          document.execCommand('formatBlock', false, '<h2>');
          break;
        case 'h3':
          document.execCommand('formatBlock', false, '<h3>');
          break;
        case 'p':
          document.execCommand('formatBlock', false, '<p>');
          break;
        case 'ul':
          document.execCommand('insertUnorderedList', false, undefined);
          break;
        case 'ol':
          document.execCommand('insertOrderedList', false, undefined);
          break;
        case 'quote':
          insertContentIntoEditor(
            '<blockquote>Lời trích dẫn quan trọng...</blockquote><p><br></p>'
          );
          break;
        case 'link': {
          const url = prompt('Nhập đường dẫn liên kết (https://...):', 'https://');
          if (url && url !== 'https://') {
            insertContentIntoEditor(
              `<a href="${url}" target="_blank" rel="noopener noreferrer">Liên kết</a>`
            );
          }
          break;
        }
        default:
          break;
      }
      handleVisualEditorInput();
    }
  }

  const validateForm = (targetStatus: 'draft' | 'published' | 'archived') => {
    const errors: Record<string, string> = {};

    if (!title.trim() || title.trim().length < 5) {
      errors.title = 'Tiêu đề bài viết cần ít nhất 5 ký tự.';
    }

    if (!slug.trim() || slug.trim().length < 5) {
      errors.slug = 'Slug cần ít nhất 5 ký tự (chữ thường, số và dấu gạch nối).';
    }

    if (!categoryId) {
      errors.categoryId = 'Vui lòng chọn danh mục bài viết.';
    }

    if (!thumbnail.trim()) {
      errors.thumbnail = 'Vui lòng nhập đường link URL ảnh đại diện.';
    }

    if (targetStatus === 'published') {
      if (!excerpt.trim() || excerpt.trim().length < 10) {
        errors.excerpt = 'Bài viết xuất bản yêu cầu tóm tắt tối thiểu 10 ký tự.';
      }
      const rawBody =
        editorMode === 'visual' && visualEditorRef.current
          ? visualEditorRef.current.innerHTML
          : content;
      if (!rawBody.trim() || rawBody.trim().length < 20) {
        errors.content = 'Bài viết xuất bản yêu cầu nội dung tối thiểu 20 ký tự.';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async (targetStatus?: 'draft' | 'published' | 'archived') => {
    const finalStatus = targetStatus || status;
    setFormError('');

    if (!validateForm(finalStatus)) {
      setFormError('Vui lòng kiểm tra và hoàn thành các trường bắt buộc bên dưới.');
      toast.warning('Dữ liệu chưa hợp lệ. Vui lòng kiểm tra lại!');
      return;
    }

    const rawContent =
      editorMode === 'visual' && visualEditorRef.current
        ? visualEditorRef.current.innerHTML
        : content;
    const finalCleanContent = cleanContentForStorage(rawContent);

    if (uploadingImage || rawContent.includes('is-uploading')) {
      toast.warning('Vui lòng đợi quá trình tải ảnh lên hoàn tất trước khi lưu bài.');
      return;
    }

    if (finalCleanContent.includes('blob:')) {
      toast.warning('Vui lòng đợi tải ảnh lên đám mây hoàn tất trước khi lưu.');
      return;
    }

    setSubmitting(true);

    try {
      const parsedTags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        excerpt: excerpt.trim(),
        content: finalCleanContent.trim(),
        categoryId,
        thumbnail: thumbnail.trim(),
        thumbnailAlt: thumbnailAlt.trim() || title.trim(),
        tags: parsedTags,
        status: finalStatus,
        isFeatured,
        isTrending,
        readTimeMinutes: Number(readTimeMinutes),
      };

      const url = isEditMode ? `/api/admin/posts/${initialData?._id}` : '/api/admin/posts';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Không thể lưu bài viết');
      }

      toast.success(
        isEditMode
          ? 'Đã cập nhật bài viết thành công!'
          : finalStatus === 'published'
          ? 'Đã xuất bản bài viết thành công!'
          : 'Đã lưu bản nháp thành công!'
      );

      router.push('/admin/posts');
      router.refresh();
    } catch (err: any) {
      setFormError(err.message || 'Lỗi khi lưu dữ liệu');
      toast.error(err.message || 'Lỗi khi lưu dữ liệu');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Hidden file input for inline image insertion */}
      <input
        type="file"
        ref={inContentImageInputRef}
        accept="image/png, image/jpeg, image/webp, image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadImageFile(file);
          if (inContentImageInputRef.current) inContentImageInputRef.current.value = '';
        }}
      />

      {/* AI Content Banner */}
      {showAIBanner && (
        <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-2xl flex items-start gap-3">
          <Wand2 className="w-5 h-5 shrink-0 text-violet-400 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-violet-300">Nội dung từ AI Article Studio</p>
            <p className="text-xs text-violet-400/80 mt-0.5">
              Tiêu đề, nội dung và tóm tắt đã được điền sẵn từ AI. Kiểm tra lại trước khi lưu — đặc
              biệt là ảnh đại diện, danh mục và slug.
            </p>
          </div>
          <button
            onClick={() => setShowAIBanner(false)}
            className="text-violet-400 hover:text-violet-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {isEditMode ? 'Chỉnh Sửa Bài Viết' : 'Tạo Bài Viết Mới'}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              {isEditMode
                ? `Cập nhật thông tin và nội dung cho bài viết #${initialData?._id?.slice(-6)}`
                : 'Soạn thảo nội dung mới cho blog của bạn'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSave('draft')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Nháp</span>
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSave('published')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{isEditMode ? 'Cập Nhật' : 'Xuất Bản'}</span>
          </button>
        </div>
      </div>

      {formError && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-300 text-xs flex items-center gap-3 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{formError}</span>
        </div>
      )}

      {/* Main Grid: Left editor (2 cols), Right sidebar (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Tiêu đề bài viết <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Ví dụ: Đánh Giá Siêu Phẩm Điện Ảnh Đáng Xem Nhất Mùa Thu 2026"
                className={`w-full bg-zinc-800 border rounded-xl px-4 py-3 text-base text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors ${
                  fieldErrors.title ? 'border-rose-500' : 'border-zinc-700'
                }`}
              />
              {fieldErrors.title && (
                <p className="text-xs text-rose-400 mt-1">{fieldErrors.title}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Đường dẫn tĩnh (Slug) <span className="text-rose-400">*</span>
              </label>
              <div className="flex items-center">
                <span className="bg-zinc-800 text-zinc-500 text-xs px-3 py-2.5 rounded-l-xl border-y border-l border-zinc-700 select-none">
                  pulse.com/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase())}
                  placeholder="sieu-pham-dien-anh-2026"
                  className={`w-full bg-zinc-800 border rounded-r-xl px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono transition-colors ${
                    fieldErrors.slug ? 'border-rose-500' : 'border-zinc-700'
                  }`}
                />
              </div>
              {fieldErrors.slug && (
                <p className="text-xs text-rose-400 mt-1">{fieldErrors.slug}</p>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Tóm tắt ngắn (Excerpt)
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Đoạn văn ngắn 1-2 câu tóm tắt nội dung hấp dẫn để hiển thị trên danh sách và thẻ SEO..."
                className={`w-full bg-zinc-800 border rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 leading-relaxed ${
                  fieldErrors.excerpt ? 'border-rose-500' : 'border-zinc-700'
                }`}
              />
              {fieldErrors.excerpt && (
                <p className="text-xs text-rose-400 mt-1">{fieldErrors.excerpt}</p>
              )}
            </div>
          </div>

          {/* Rich Content Editor with Visual WYSIWYG & Media Blocks */}
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-200">
                  Nội dung chi tiết (Article Body Content) <span className="text-rose-400">*</span>
                </label>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Paste ảnh trực tiếp từ clipboard, dán URL YouTube, kéo thả di chuyển hoặc co giãn
                  kích thước ảnh bằng chuột.
                </p>
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center gap-1 bg-zinc-800 p-1 rounded-xl border border-zinc-700">
                <button
                  type="button"
                  onClick={() => handleModeSwitch('visual')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    editorMode === 'visual'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  title="Soạn thảo trực quan với khối ảnh và video thực tế"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Trực quan</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleModeSwitch('code')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    editorMode === 'code'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  title="Chỉnh sửa mã nguồn HTML thô"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>HTML Code</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleModeSwitch('preview')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    editorMode === 'preview'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  title="Xem trước giao diện độc giả"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem trước</span>
                </button>
              </div>
            </div>

            {/* Rich Editor Toolbar */}
            {editorMode !== 'preview' && (
              <div className="flex flex-wrap items-center gap-1.5 p-2 bg-zinc-800/90 border border-zinc-700 rounded-t-xl text-zinc-300">
                <button
                  type="button"
                  onClick={() => handleToolbarFormat('h2')}
                  className="px-2.5 py-1.5 hover:bg-zinc-700 hover:text-white rounded-lg text-xs font-bold transition"
                  title="Tiêu đề H2"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => handleToolbarFormat('h3')}
                  className="px-2.5 py-1.5 hover:bg-zinc-700 hover:text-white rounded-lg text-xs font-bold transition"
                  title="Tiêu đề H3"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => handleToolbarFormat('p')}
                  className="px-2.5 py-1.5 hover:bg-zinc-700 hover:text-white rounded-lg text-xs font-medium transition"
                  title="Đoạn văn"
                >
                  P
                </button>

                <div className="w-px h-5 bg-zinc-700 mx-1" />

                <button
                  type="button"
                  onClick={() => handleToolbarFormat('bold')}
                  className="p-1.5 hover:bg-zinc-700 hover:text-white rounded-lg transition"
                  title="In đậm (Bold)"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleToolbarFormat('italic')}
                  className="p-1.5 hover:bg-zinc-700 hover:text-white rounded-lg transition"
                  title="In nghiêng (Italic)"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleToolbarFormat('underline')}
                  className="p-1.5 hover:bg-zinc-700 hover:text-white rounded-lg transition"
                  title="Gạch chân (Underline)"
                >
                  <Underline className="w-4 h-4" />
                </button>

                <div className="w-px h-5 bg-zinc-700 mx-1" />

                <button
                  type="button"
                  onClick={() => handleToolbarFormat('ul')}
                  className="p-1.5 hover:bg-zinc-700 hover:text-white rounded-lg transition"
                  title="Danh sách gạch đầu dòng"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleToolbarFormat('ol')}
                  className="p-1.5 hover:bg-zinc-700 hover:text-white rounded-lg transition"
                  title="Danh sách số"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleToolbarFormat('quote')}
                  className="p-1.5 hover:bg-zinc-700 hover:text-white rounded-lg transition"
                  title="Khối trích dẫn"
                >
                  <Quote className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleToolbarFormat('link')}
                  className="p-1.5 hover:bg-zinc-700 hover:text-white rounded-lg transition"
                  title="Chèn liên kết"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>

                <div className="w-px h-5 bg-zinc-700 mx-1" />

                {/* Upload Image Button */}
                <button
                  type="button"
                  onClick={() => inContentImageInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold transition"
                  title="Tải ảnh lên từ máy tính"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Tải ảnh</span>
                </button>

                {/* Image URL Button */}
                <button
                  type="button"
                  onClick={handleInsertImageUrl}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-700/60 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-medium transition"
                  title="Chèn ảnh từ link URL bên ngoài"
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>URL Ảnh</span>
                </button>

                {/* YouTube Embed Button */}
                <button
                  type="button"
                  onClick={() => handleInsertYouTube()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-semibold transition"
                  title="Nhúng video YouTube hoặc Shorts"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>YouTube</span>
                </button>

                {uploadingImage && (
                  <span className="text-[11px] text-indigo-400 flex items-center gap-1.5 ml-auto animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Đang tải ảnh lên đám mây...
                  </span>
                )}
              </div>
            )}

            {/* Visual WYSIWYG Mode */}
            {editorMode === 'visual' && (
              <div
                ref={visualEditorRef}
                className="blogweb-visual-editor article-prose min-h-[460px] p-5 bg-zinc-800/80 border border-zinc-700 rounded-b-xl text-zinc-100 focus:outline-none leading-relaxed transition-colors"
                contentEditable="true"
                suppressContentEditableWarning={true}
                onInput={handleVisualEditorInput}
                onClick={handleVisualEditorClick}
                onKeyDown={handleVisualEditorKeyDown}
                onMouseDown={handleVisualEditorMouseDown}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                onPaste={handlePaste}
                data-placeholder="Nhập nội dung bài viết tại đây... Bạn có thể paste ảnh trực tiếp, dán link YouTube để tự động nhúng, kéo thả di chuyển khối hoặc kéo góc để phóng to/thu nhỏ ảnh."
              />
            )}

            {/* Raw HTML Code Mode */}
            {editorMode === 'code' && (
              <textarea
                ref={textareaRef}
                rows={16}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onPaste={handlePaste}
                placeholder="Chỉnh sửa mã HTML..."
                className="w-full bg-zinc-800/90 border border-zinc-700 rounded-b-xl p-4 text-xs font-mono text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            )}

            {/* Reader Preview Mode */}
            {editorMode === 'preview' && (
              <div className="min-h-[460px] p-6 bg-white rounded-xl border border-zinc-700 text-gray-900">
                <div
                  className="article-prose"
                  dangerouslySetInnerHTML={{ __html: renderContentToHtml(content) }}
                />
              </div>
            )}

            {fieldErrors.content && (
              <p className="text-xs text-rose-400 mt-1">{fieldErrors.content}</p>
            )}
          </div>
        </div>

        {/* Sidebar Settings Column */}
        <div className="space-y-5">
          {/* Publishing Meta Box */}
          <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2">
              Thiết lập Xuất bản
            </h3>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Trạng thái bài viết
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="draft">Bản nháp (Draft)</option>
                <option value="published">Công khai (Published)</option>
                <option value="archived">Lưu trữ (Archived)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Danh mục <span className="text-rose-400">*</span>
              </label>
              {loadingCategories ? (
                <div className="text-xs text-zinc-500">Đang tải danh mục...</div>
              ) : (
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className={`w-full bg-zinc-800 border rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500 ${
                    fieldErrors.categoryId ? 'border-rose-500' : 'border-zinc-700'
                  }`}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
              {fieldErrors.categoryId && (
                <p className="text-xs text-rose-400 mt-1">{fieldErrors.categoryId}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Thời gian đọc dự kiến (phút)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={readTimeMinutes}
                  onChange={(e) => setReadTimeMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                />
                <span className="text-xs text-zinc-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> phút đọc
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800 space-y-2.5">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded bg-zinc-800 border-zinc-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="text-xs text-zinc-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Bài viết Nổi bật (Featured)
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  className="rounded bg-zinc-800 border-zinc-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="text-xs text-zinc-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  Xu hướng thịnh hành (Trending)
                </span>
              </label>
            </div>
          </div>

          {/* Featured Thumbnail */}
          <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2">
              Ảnh Đại Diện (Cover) <span className="text-rose-400">*</span>
            </h3>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Link URL ảnh</label>
              <input
                type="text"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className={`w-full bg-zinc-800 border rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 ${
                  fieldErrors.thumbnail ? 'border-rose-500' : 'border-zinc-700'
                }`}
              />
              {fieldErrors.thumbnail && (
                <p className="text-xs text-rose-400 mt-1">{fieldErrors.thumbnail}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Alt Text (Mô tả ảnh cho SEO)
              </label>
              <input
                type="text"
                value={thumbnailAlt}
                onChange={(e) => setThumbnailAlt(e.target.value)}
                placeholder="Mô tả nội dung bức ảnh..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {thumbnail && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700">
                <Image
                  src={thumbnail}
                  alt={thumbnailAlt || 'Preview'}
                  fill
                  className="object-cover"
                  unoptimized
                  onError={() => {
                    // Fail gracefully
                  }}
                />
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2">
              Thẻ Phân Loại (Tags)
            </h3>
            <div>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="phim ảnh, âm nhạc, giải trí..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[11px] text-zinc-500 mt-1">Phân cách các thẻ bằng dấu phẩy (,)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
