export interface ValuationRecord {
  id: string;
  assetId: string;
  value: number;
  recordedDate: string;   // ISO 8601
  note: string;
  createdAt: string;
}
