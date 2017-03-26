export interface Book {
  title: string;
  bookId: string;
  model: string;
  make: string;
  year: number;
  thumbnailPath: string;
  color: string;
  editure: Editure;
  highestBid: number;
  bidEnds: Date;
}

export interface Editure {
  'editureName': string;
}
