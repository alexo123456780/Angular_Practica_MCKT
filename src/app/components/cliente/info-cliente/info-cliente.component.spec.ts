import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoClienteComponent } from './info-cliente.component';

describe('InfoClienteComponent', () => {
  let component: InfoClienteComponent;
  let fixture: ComponentFixture<InfoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
