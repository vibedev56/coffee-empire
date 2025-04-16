export interface Product {
  id: number;
  name: string;
  status: string;
  dateCreated: string;
  category: string;
  price: number;
  brand: string;
}

export interface NumberRange {
  min?: number;
  max?: number;
}

export interface ProductFilters {
  name?: string[];
  brand?: string[];
  status?: string[];
  price?: NumberRange;
  date_created?: {
    from?: string;
    to?: string;
  };
}
