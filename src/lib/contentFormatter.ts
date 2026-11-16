/**
 * Content Formatter & Rich Media Engine for Blogweb
 */

export function extractYouTubeId(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') return null;
  const str = url.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return str;
  }

  if (!/(?:youtube(?:-nocookie)?\.com|youtu\.be)/i.test(str)) {
    return null;
  }

  try {
    const shortMatch = str.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
    if (shortMatch) return shortMatch[1];

    const shortsMatch = str.match(/(?:youtube(?:-nocookie)?\.com\/shorts\/)([a-zA-Z0-9_-]{11})/i);
    if (shortsMatch) return shortsMatch[1];

    const embedMatch = str.match(/(?:youtube(?:-nocookie)?\.com\/embed\/)([a-zA-Z0-9_-]{11})/i);
    if (embedMatch) return embedMatch[1];

    const watchMatch = str.match(/(?:youtube(?:-nocookie)?\.com\/watch\?[^#\s]*\bv=)([a-zA-Z0-9_-]{11})/i);
    if (watchMatch) return watchMatch[1];

    const altMatch = str.match(/(?:youtube(?:-nocookie)?\.com\/(?:v|live)\/)([a-zA-Z0-9_-]{11})/i);
    if (altMatch) return altMatch[1];
  } catch (e) {
    return null;
  }

  return null;
}

export function isYouTubeShortsUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false;
  return /youtube(?:-nocookie)?\.com\/shorts\//i.test(url);
}

export function buildYouTubeMediaBlockHtml({
  videoId,
  isShorts = false,
  isInteractive = false,
}: {
  videoId: string;
  isShorts?: boolean;
  isInteractive?: boolean;
}): string {
  if (!videoId) return '';

  const toolbarHtml = isInteractive
    ? `
  <header class="media-block-toolbar" contenteditable="false">
    <div class="media-toolbar-group">
      <span class="media-drag-handle" title="Kéo để đổi vị trí" draggable="true">⠿ Kéo</span>
      <button type="button" class="media-btn media-move-up" title="Di chuyển lên trên">▲ Lên</button>
      <button type="button" class="media-btn media-move-down" title="Di chuyển xuống dưới">▼ Xuống</button>
    </div>
    <span class="media-toolbar-label">${isShorts ? 'YouTube Shorts' : 'YouTube Video'}</span>
    <button type="button" class="media-btn media-delete-btn" title="Xóa video khỏi bài viết">🗑️ Xóa</button>
  </header>`
    : '';

  if (isShorts) {
    return `\n<div class="media-block media-block-youtube youtube-shorts-wrapper" data-media-type="youtube" data-yt-id="${videoId}" style="max-width:380px;margin:2rem auto;text-align:center;position:relative;" contenteditable="false">${toolbarHtml}
  <div class="video-container video-shorts" style="position:relative;padding-bottom:177.77%;height:0;overflow:hidden;border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,0.12);background:#000;">
    <iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="YouTube Shorts player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"></iframe>
  </div>
</div>\n`;
  }

  return `\n<div class="media-block media-block-youtube" data-media-type="youtube" data-yt-id="${videoId}" style="margin:2rem 0;position:relative;" contenteditable="false">${toolbarHtml}
  <div class="video-container" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,0.08);background:#000;">
    <iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"></iframe>
  </div>
</div>\n`;
}

export function createYouTubeEmbed(urlOrId: string, options: { isShorts?: boolean; interactive?: boolean } = {}): string | null {
  const videoId = extractYouTubeId(urlOrId);
  if (!videoId) return null;
  const isShorts = options.isShorts || isYouTubeShortsUrl(urlOrId);
  return buildYouTubeMediaBlockHtml({ videoId, isShorts, isInteractive: !!options.interactive });
}

export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();

  if (!/^https?:\/\//i.test(trimmed) && !trimmed.startsWith('/')) {
    return false;
  }

  const hasImageExt = /\.(jpe?g|png|webp|gif|svg|avif)(\?.*)?$/i.test(trimmed);
  const isImageHosting = /(?:supabase\.co\/storage|images\.unsplash\.com|res\.cloudinary\.com|i\.imgur\.com|media\.giphy\.com)/i.test(
    trimmed
  );

  return hasImageExt || isImageHosting;
}

export function buildImageMediaBlockHtml({
  url,
  alt = 'Minh họa bài viết',
  caption = '',
  width = null,
  align = 'center',
  isInteractive = false,
}: {
  url: string;
  alt?: string;
  caption?: string;
  width?: number | string | null;
  align?: 'left' | 'center' | 'right' | string;
  isInteractive?: boolean;
}): string {
  if (!url || typeof url !== 'string') return '';
  const cleanUrl = url.trim();
  const cleanAlt = (alt || 'Minh họa bài viết').replace(/"/g, '&quot;');
  const rawWidthStr = width ? String(width).trim() : '';
  const safeAlign = ['left', 'center', 'right'].includes(align) ? align : 'center';
  
  let widthStyle = 'max-width:100%;width:100%;';
  if (rawWidthStr.endsWith('%')) {
    widthStyle = `max-width:${rawWidthStr};width:${rawWidthStr};`;
  } else if (rawWidthStr && !isNaN(parseInt(rawWidthStr, 10))) {
    const pxVal = parseInt(rawWidthStr, 10);
    widthStyle = `max-width:${pxVal}px;width:100%;`;
  }

  let marginStyle = 'margin:2rem auto;';
  if (safeAlign === 'left') marginStyle = 'margin:2rem auto 2rem 0;';
  if (safeAlign === 'right') marginStyle = 'margin:2rem 0 2rem auto;';

  const cleanCaption = caption
    ? `<figcaption class="media-caption" style="text-align:center;font-size:0.85rem;color:#64748b;margin-top:0.5rem;font-style:italic;">${caption
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')}</figcaption>`
    : '';

  const toolbarHtml = isInteractive
    ? `
  <header class="media-block-toolbar" contenteditable="false">
    <div class="media-toolbar-group">
      <span class="media-drag-handle" title="Kéo để đổi vị trí" draggable="true">⠿ Kéo</span>
      <button type="button" class="media-btn media-move-up" title="Di chuyển ảnh lên trên đoạn văn trước">▲ Lên</button>
      <button type="button" class="media-btn media-move-down" title="Di chuyển ảnh xuống dưới đoạn văn sau">▼ Xuống</button>
    </div>
    <div class="media-toolbar-group" title="Phóng to / thu nhỏ ảnh">
      <button type="button" class="media-btn media-size-btn" data-size="25" title="Kích thước nhỏ 25%">25%</button>
      <button type="button" class="media-btn media-size-btn" data-size="50" title="Kích thước vừa 50%">50%</button>
      <button type="button" class="media-btn media-size-btn" data-size="75" title="Kích thước lớn 75%">75%</button>
      <button type="button" class="media-btn media-size-btn" data-size="100" title="Kích thước đầy đủ 100%">100%</button>
      <button type="button" class="media-btn media-zoom-out" title="Thu nhỏ bớt ảnh">➖</button>
      <button type="button" class="media-btn media-zoom-in" title="Phóng to thêm ảnh">➕</button>
    </div>
    <div class="media-toolbar-group">
      <button type="button" class="media-btn media-align-left ${safeAlign === 'left' ? 'active' : ''}" data-align-btn="left" title="Căn lề trái">Trái</button>
      <button type="button" class="media-btn media-align-center ${safeAlign === 'center' ? 'active' : ''}" data-align-btn="center" title="Căn lề giữa">Giữa</button>
      <button type="button" class="media-btn media-align-right ${safeAlign === 'right' ? 'active' : ''}" data-align-btn="right" title="Căn lề phải">Phải</button>
    </div>
    <button type="button" class="media-btn media-delete-btn" title="Xóa ảnh này khỏi nội dung">🗑️ Xóa</button>
  </header>`
    : '';

  const resizeHandlesHtml = isInteractive
    ? `
    <span class="media-resize-handle media-resize-se" data-handle="se" title="Kéo góc này để phóng to / thu nhỏ kích thước ảnh"></span>
    <span class="media-resize-handle media-resize-sw" data-handle="sw" title="Kéo góc này để phóng to / thu nhỏ kích thước ảnh"></span>`
    : '';

  return `\n<figure class="media-block media-block-image" data-media-type="image" ${rawWidthStr ? `data-width="${rawWidthStr}"` : ''} data-align="${safeAlign}" style="${widthStyle}${marginStyle}text-align:${safeAlign};position:relative;" contenteditable="false">${toolbarHtml}
  <div class="media-image-wrapper" style="position:relative;display:inline-block;width:100%;max-width:100%;">
    <img src="${cleanUrl}" alt="${cleanAlt}" loading="lazy" style="width:100%;height:auto;border-radius:10px;display:block;box-shadow:0 4px 12px rgba(0,0,0,0.06);" onerror="this.onerror=null;this.parentElement.innerHTML='<div style=\\'padding:1.25rem;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;color:#dc2626;font-size:0.875rem;\\'>⚠️ Không thể tải ảnh: ${cleanUrl}</div>';" />${resizeHandlesHtml}
  </div>${cleanCaption}
</figure>\n`;
}

export function createImageEmbed(
  url: string,
  alt = 'Minh họa bài viết',
  caption = '',
  options: { width?: number | string; align?: string; interactive?: boolean } = {}
): string {
  const width = options.width || null;
  const align = options.align || 'center';
  const isInteractive = !!options.interactive;
  return buildImageMediaBlockHtml({ url, alt, caption, width, align, isInteractive });
}

export function cleanContentForStorage(html: string): string {
  if (!html || typeof html !== 'string') return '';
  let clean = html;

  clean = clean.replace(/<header\b[^>]*\bclass="media-block-toolbar"[^>]*>[\s\S]*?<\/header>/gi, '');
  clean = clean.replace(/<div\b[^>]*\bclass="media-block-toolbar"[^>]*>[\s\S]*?<\/div>/gi, '');
  clean = clean.replace(/<(?:span|div)\b[^>]*\bclass="[^"]*media-resize-handle[^"]*"[^>]*><\/(?:span|div)>/gi, '');
  clean = clean.replace(/<div\b[^>]*\bclass="[^"]*media-upload-overlay[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  clean = clean.replace(/<div\b[^>]*\bclass="[^"]*media-upload-error[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  clean = clean.replace(/\b(is-selected|is-dragging|drop-indicator-top|drop-indicator-bottom|is-uploading)\b/g, '');
  clean = clean.replace(/class="([^"]*)"/g, (m, cls) => `class="${cls.trim().replace(/\s+/g, ' ')}"`);

  return clean.trim();
}

export function prepareContentForEditor(html: string): string {
  if (!html || typeof html !== 'string') return '';
  let content = html;

  // 1. YouTube Shorts wrapper transformation
  content = content.replace(/<div\b[^>]*class="[^"]*(?:youtube-shorts-wrapper|video-shorts)[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, (match) => {
    const ytId = extractYouTubeId(match);
    if (!ytId) return match;
    return buildYouTubeMediaBlockHtml({ videoId: ytId, isShorts: true, isInteractive: true });
  });

  // 2. YouTube standard wrapper transformation
  content = content.replace(/<div\b[^>]*class="[^"]*video-container[^"]*"[^>]*>[\s\S]*?<\/div>/gi, (match) => {
    const ytId = extractYouTubeId(match);
    if (!ytId) return match;
    const isShorts = isYouTubeShortsUrl(match);
    return buildYouTubeMediaBlockHtml({ videoId: ytId, isShorts, isInteractive: true });
  });

  // 3. Existing media block figure transformation
  content = content.replace(/<figure\b[^>]*>([\s\S]*?)<\/figure>/gi, (match, inner) => {
    const imgMatch = inner.match(/<img\b([^>]*)>/i);
    if (!imgMatch) return match;
    const attrs = imgMatch[1];
    const srcMatch = attrs.match(/\bsrc=["']([^"']*)["']/i);
    const altMatch = attrs.match(/\balt=["']([^"']*)["']/i);
    const src = srcMatch ? srcMatch[1] : '';
    const alt = altMatch ? altMatch[1] : '';

    const capMatch = inner.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i);
    const caption = capMatch ? capMatch[1] : '';

    const widthMatch = match.match(/data-width=["']?([^"']+)["']?/i) || match.match(/max-width:\s*([^;]+)/i);
    const width = widthMatch ? widthMatch[1].replace('px', '').trim() : null;

    const alignMatch = match.match(/data-align=["']?(left|center|right)["']?/i) || match.match(/text-align:\s*(left|center|right)/i);
    const align = alignMatch ? alignMatch[1] : 'center';

    return buildImageMediaBlockHtml({ url: src, alt, caption, width, align, isInteractive: true });
  });

  // 4. Standalone raw <img> not inside <figure> (including wrapped in <p>)
  content = content.replace(/<p\b[^>]*>\s*(<img\b[^>]*>)\s*<\/p>/gi, '$1');
  content = content.replace(/<img\b([^>]*)>/gi, (match, attrs) => {
    const srcMatch = attrs.match(/\bsrc=["']([^"']*)["']/i);
    const altMatch = attrs.match(/\balt=["']([^"']*)["']/i);
    const src = srcMatch ? srcMatch[1] : '';
    const alt = altMatch ? altMatch[1] : '';
    if (!src) return match;
    return buildImageMediaBlockHtml({ url: src, alt, isInteractive: true });
  });

  return content;
}

export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') return '';
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<header\b[^>]*\bclass="media-block-toolbar"[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<div\b[^>]*\bclass="media-block-toolbar"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<(?:span|div)\b[^>]*\bclass="[^"]*media-resize-handle[^"]*"[^>]*><\/(?:span|div)>/gi, '')
    .replace(/<div\b[^>]*\bclass="[^"]*media-upload-overlay[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<div\b[^>]*\bclass="[^"]*media-upload-error[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*["']\s*javascript:[^"']*["']/gi, '$1="#"')
    .replace(/href\s*=\s*["']\s*data:[^"']*["']/gi, 'href="#"');

  sanitized = sanitized.replace(/<iframe\b([^>]*)>([\s\S]*?)<\/iframe>/gi, (match, attrs) => {
    const srcMatch = attrs.match(/\bsrc=["']([^"']*)["']/i);
    const src = srcMatch ? srcMatch[1] : '';
    const ytId = extractYouTubeId(src);
    if (ytId) {
      return `<iframe src="https://www.youtube-nocookie.com/embed/${ytId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"></iframe>`;
    }
    return `<!-- Blocked unauthorized iframe: only YouTube embeds are permitted -->`;
  });

  return sanitized;
}

export function formatInline(text: string): string {
  if (!text || typeof text !== 'string') return '';

  let out = text;
  out = out.replace(/`([^`\n]+)`/g, (m, code) => {
    const safe = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<code>${safe}</code>`;
  });
  out = out.replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g, (m, alt, url) => {
    return `<img src="${url}" alt="${alt || 'Image'}" style="max-width:100%;height:auto;border-radius:10px;margin:1.75rem auto;display:block;" />`;
  });
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (m, title, url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>`;
  });
  out = out.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/__([^_\n]+?)__/g, '<strong>$1</strong>');
  out = out.replace(/~~([^~\n]+?)~~/g, '<strong><del>$1</del></strong>');
  out = out.replace(/(^|[^\w*])\*([^*\n\s][^*\n]*?)\*(?=[^\w*]|$)/g, '$1<em>$2</em>');
  out = out.replace(/(^|[^\w_])_([^_\n\s][^_\n]*?)_(?=[^\w_]|$)/g, '$1<em>$2</em>');

  return out;
}

export function convertStandaloneMediaUrls(content: string): string {
  if (!content || typeof content !== 'string') return '';
  const lines = content.replace(/\r\n/g, '\n').split('\n');

  const processedLines = lines.map((line) => {
    const trimmed = line.trim();

    const pLinkMatch = trimmed.match(
      /^<p>\s*(?:<a\s+[^>]*href=["']([^"']*)["'][^>]*>)?\s*(https?:\/\/[^\s<"']+)\s*(?:<\/a>)?\s*<\/p>$/i
    );
    if (pLinkMatch) {
      const targetUrl = pLinkMatch[1] || pLinkMatch[2];
      const ytId = extractYouTubeId(targetUrl);
      if (ytId) {
        return createYouTubeEmbed(targetUrl);
      }
      if (isValidImageUrl(targetUrl)) {
        return createImageEmbed(targetUrl, 'Minh họa bài viết');
      }
    }

    if (/^https?:\/\/[^\s<"']+$/i.test(trimmed)) {
      const ytId = extractYouTubeId(trimmed);
      if (ytId) {
        return createYouTubeEmbed(trimmed);
      }
      if (isValidImageUrl(trimmed)) {
        return createImageEmbed(trimmed, 'Minh họa bài viết');
      }
    }

    return line;
  });

  return processedLines.join('\n');
}

export function renderContentToHtml(content: string): string {
  if (!content || typeof content !== 'string') return '';
  let text = content.replace(/\r\n/g, '\n').trim();

  // If already clean semantic HTML with <p> and headings, return as is
  if (text.includes('<p') && (text.includes('<h2') || text.includes('<h3') || text.includes('<ul'))) {
    return text;
  }

  // 1. Fenced Code Blocks (```lang ... ```)
  text = text.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gi, (match, lang, code) => {
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .trim();
    const languageClass = lang ? `language-${lang}` : 'language-bash';
    return `\n\n<pre class="bg-slate-950 text-emerald-400 p-4 sm:p-5 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto my-6 border border-slate-800 shadow-md leading-relaxed"><code class="${languageClass}">${escaped}</code></pre>\n\n`;
  });

  // 2. GitHub Alert Boxes (> [!TIP] ... or > [!NOTE] ...)
  text = text.replace(/^>\s*\[!(TIP|NOTE|IMPORTANT|WARNING|CAUTION)\]\s*\n((?:>.*\n?)*)/gim, (match, type, body) => {
    const cleanBody = (body as string)
      .split('\n')
      .map((l: string) => l.replace(/^>\s?/, '').trim())
      .filter(Boolean)
      .join('<br />');

    const alertStyles: Record<string, { bg: string; border: string; text: string; label: string }> = {
      TIP: { bg: 'bg-emerald-50', border: 'border-emerald-500', text: 'text-emerald-900', label: 'Pro Tip' },
      NOTE: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-900', label: 'Important Note' },
      IMPORTANT: { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-900', label: 'Important' },
      WARNING: { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-900', label: 'Warning' },
      CAUTION: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-900', label: 'Caution' },
    };
    const s = alertStyles[type.toUpperCase()] || alertStyles.TIP;
    return `\n\n<div class="p-4 sm:p-5 my-6 rounded-2xl border-l-4 ${s.border} ${s.bg} ${s.text} shadow-xs"><div class="font-black uppercase tracking-wider text-xs mb-1.5">${s.label}</div><div class="text-sm sm:text-base leading-relaxed">${cleanBody}</div></div>\n\n`;
  });

  // 3. Standard blockquotes (> text)
  text = text.replace(/^>\s*(.+)$/gm, '\n\n<blockquote class="p-4 my-4 bg-slate-50 border-l-4 border-slate-300 rounded-r-xl italic text-slate-700 text-sm sm:text-base">$1</blockquote>\n\n');

  // 4. Horizontal separators (---)
  text = text.replace(/^---$/gm, '\n\n<hr class="my-8 border-slate-200" />\n\n');

  // 5. Headings (### and ##)
  text = text.replace(/^###\s+(.+)$/gm, '\n\n<h3 class="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3 tracking-tight font-display">$1</h3>\n\n');
  text = text.replace(/^##\s+(.+)$/gm, '\n\n<h2 class="text-2xl sm:text-3xl font-black text-slate-900 mt-10 mb-4 tracking-tight font-display">$1</h2>\n\n');
  text = text.replace(/^#\s+(.+)$/gm, '\n\n<h2 class="text-2xl sm:text-3xl font-black text-slate-900 mt-10 mb-4 tracking-tight font-display">$1</h2>\n\n');

  // 6. Unordered lists (- or *)
  text = text.replace(/(?:^|\n)((?:[-*]\s+.+\n?)+)/g, (match, listBlock) => {
    const items = (listBlock as string)
      .trim()
      .split('\n')
      .map((l: string) => {
        const line = l.replace(/^[-*]\s+/, '').trim();
        return `<li class="leading-relaxed">${line}</li>`;
      })
      .join('\n');
    return `\n\n<ul class="list-disc pl-5 space-y-2.5 my-4 text-slate-700 text-sm sm:text-base">\n${items}\n</ul>\n\n`;
  });

  // 7. Ordered lists (1. 2.)
  text = text.replace(/(?:^|\n)((?:\d+\.\s+.+\n?)+)/g, (match, listBlock) => {
    const items = (listBlock as string)
      .trim()
      .split('\n')
      .map((l: string) => {
        const line = l.replace(/^\d+\.\s+/, '').trim();
        return `<li class="leading-relaxed">${line}</li>`;
      })
      .join('\n');
    return `\n\n<ol class="list-decimal pl-5 space-y-2.5 my-4 text-slate-700 text-sm sm:text-base">\n${items}\n</ol>\n\n`;
  });

  // 8. Inline formatting: code, bold, italic, links
  text = text.replace(/`([^`\n]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-blue-700 font-mono text-xs sm:text-sm border border-slate-200 font-semibold">$1</code>');
  text = text.replace(/\*\*([^*\n]+)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
  text = text.replace(/(^|[^\*])\*([^*\n]+)\*([^\*]|$)/g, '$1<em>$2</em>$3');
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline font-semibold hover:text-blue-800">$1</a>');

  // 9. Separate block tags so following prose is always an isolated block
  text = text.replace(/(<\/h[1-6]>)\s*([^\n<])/g, '$1\n\n$2');
  text = text.replace(/(<\/ul>|<\/ol>|<\/pre>|<\/div>|<\/blockquote>|<hr[^>]*>)\s*([^\n<])/g, '$1\n\n$2');

  // 10. Process blocks and wrap non-block text in <p> paragraphs
  const rawBlocks = text.split(/\n{2,}/);
  const finalHtmlBlocks: string[] = [];

  for (const block of rawBlocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // If it's already an HTML block tag, push directly
    if (/^<(?:h[1-6]|ul|ol|pre|div|blockquote|hr|table|figure|p|section)\b/i.test(trimmed)) {
      finalHtmlBlocks.push(trimmed);
    } else {
      // It is standard body prose -> wrap in <p>
      const paragraphHtml = `<p class="text-slate-700 leading-relaxed text-sm sm:text-base mb-5">${trimmed.replace(/\n/g, '<br />')}</p>`;
      finalHtmlBlocks.push(paragraphHtml);
    }
  }

  return finalHtmlBlocks.join('\n\n');
}
