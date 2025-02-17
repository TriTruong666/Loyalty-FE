export interface Signature {
  publicID: string;
  apiSecret: string;
}

export interface DeleteFile {
  signature: string;
  public_id: string;
  timestamp: string;
  api_key: string;
}

export interface CloudinaryAsset {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string; // ISO date string
  bytes: number;
  width: number;
  height: number;
  asset_folder?: string; // Optional if sometimes empty
  display_name?: string; // Optional if sometimes empty
  url: string;
  secure_url: string;
}
