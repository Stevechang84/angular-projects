import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextPreviewerComponent } from './text-previewer.component';

describe('TextPreviewerComponent', () => {
  let component: TextPreviewerComponent;
  let fixture: ComponentFixture<TextPreviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextPreviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextPreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
