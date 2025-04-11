import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChecklistFormComponent } from './create-checklist-form.component';

describe('CreateChecklistFormComponent', () => {
  let component: CreateChecklistFormComponent;
  let fixture: ComponentFixture<CreateChecklistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateChecklistFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateChecklistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
