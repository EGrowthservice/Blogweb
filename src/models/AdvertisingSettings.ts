import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdvertisingSettings extends Document {
  gaEnabled: boolean;
  gaMeasurementId: string;
  googleAdsEnabled: boolean;
  googleAdsConversionId: string;
  googleAdsConversionLabel: string;
  adsenseEnabled: boolean;
  adsensePublisherId: string;
  adsenseDefaultSlot: string;
  adsenseHeaderSlot: string;
  adsenseContentSlot: string;
  adsenseSidebarSlot: string;
  adsenseFooterSlot: string;
  gtmEnabled: boolean;
  gtmContainerId: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdvertisingSettingsSchema = new Schema<IAdvertisingSettings>(
  {
    gaEnabled: { type: Boolean, default: true },
    gaMeasurementId: { type: String, default: 'G-5F0GDVTZPE', trim: true },
    googleAdsEnabled: { type: Boolean, default: false },
    googleAdsConversionId: { type: String, default: '', trim: true },
    googleAdsConversionLabel: { type: String, default: '', trim: true },
    adsenseEnabled: { type: Boolean, default: false },
    adsensePublisherId: {
      type: String,
      default: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-0000000000000000',
      trim: true,
    },
    adsenseDefaultSlot: { type: String, default: '', trim: true },
    adsenseHeaderSlot: { type: String, default: '', trim: true },
    adsenseContentSlot: { type: String, default: '', trim: true },
    adsenseSidebarSlot: { type: String, default: '', trim: true },
    adsenseFooterSlot: { type: String, default: '', trim: true },
    gtmEnabled: { type: Boolean, default: false },
    gtmContainerId: { type: String, default: '', trim: true },
  },
  {
    timestamps: true,
  }
);

export const AdvertisingSettings: Model<IAdvertisingSettings> =
  mongoose.models.AdvertisingSettings ||
  mongoose.model<IAdvertisingSettings>('AdvertisingSettings', AdvertisingSettingsSchema);

export async function getOrCreateAdvertisingSettings(): Promise<IAdvertisingSettings> {
  let settings = await AdvertisingSettings.findOne();
  if (!settings) {
    settings = await AdvertisingSettings.create({
      gaEnabled: true,
      gaMeasurementId: 'G-5F0GDVTZPE',
      adsensePublisherId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-0000000000000000',
    });
  }
  return settings;
}
