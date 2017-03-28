export interface Book {
  title: string;
  bookId: string;
  domain: string;
  make: string;
  year: number;
  thumbnailPath: string;
  color: string;
  editor: Editor;
  highestBid: number;
  bidEnds: Date;
}

export interface Editor {
  'editorName': string;
}
