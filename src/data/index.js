// Import all individual data modules
import { brandData } from "./brandData";
import { booksData } from "./booksData";
import { noveltiesData } from "./noveltiesData";

// Export all data as a single object
export const data = {
  brand: brandData,
  books: booksData,
  novelties: noveltiesData,
};
