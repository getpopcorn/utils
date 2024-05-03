export type DatasetHeaderType = 'short_text' | 'number';

export type StoredMetadataRepresentation = {
  d?: string;
};

export type StoredHeadersRepresentation = {
  u: string;
  h: StoredHeaderRepresentation[];
};

export type StoredHeaderRepresentation = {
  i: string;
  t: DatasetHeaderType;
  r: boolean;
  /**
   * Display name.
   */
  n: string;
  /**
   * Position in horizontal direction, 0-n.
   */
  p: number;
  /**
   * Points to a User ID.
   */
  l: string;
};

export type StoredItemRepresentation = {
  i: string;
  f: StoredFieldRepresentation[];
};

export type StoredFieldRepresentation = {
  /**
   * Which header it belongs to. References the header's ID.
   */
  h: string;
  v: string;
};
