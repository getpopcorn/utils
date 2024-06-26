export type Metadata = {
  deletedAt?: string;
};

export type Headers = {
  updatedAt: string;
  headers: Header[];
};

export type Header = {
  id: string;
  type: DatasetHeaderType;
  isRequired: boolean;
  /**
   * Display name.
   */
  name: string;
  /**
   * Position in horizontal direction, 0-n.
   */
  position: number;
  /**
   * Points to a User ID.
   */
  lastChangedBy: string;
};

export type Item = {
  id: string;
  fields: Field[];
  createdAt: string;
};

export type MeilisearchItem = {
  id: string;
  [key: string]: string | number;
};

export type Field = {
  /**
   * Which header it belongs to. References the header's ID.
   */
  headerRef: string;
  value: unknown;
};

export type DatasetHeaderType = 'short_text' | 'number' | 'boolean';

export type DatasetGetResult = {
  metadata: Metadata;
  headers: Headers;
  items: MeilisearchItem[];
};

export type DatasetInputValidationResult = {
  success: boolean;
  errors: string[];
  payload: any[];
};
