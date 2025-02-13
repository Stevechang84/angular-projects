import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonToCsharpClassComponent } from './json-to-csharp-class.component';

describe('JsonToCsharpClassComponent', () => {
  let component: JsonToCsharpClassComponent;
  let fixture: ComponentFixture<JsonToCsharpClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonToCsharpClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonToCsharpClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
