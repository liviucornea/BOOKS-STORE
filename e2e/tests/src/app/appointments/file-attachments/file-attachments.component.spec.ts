import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAttachmentsComponent } from './file-attachments.component';

describe('FileAttachmentsComponent', () => {
  let component: FileAttachmentsComponent;
  let fixture: ComponentFixture<FileAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileAttachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
