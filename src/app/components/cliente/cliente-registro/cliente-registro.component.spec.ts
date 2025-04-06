import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteRegistroComponent } from './cliente-registro.component';

describe('ClienteRegistroComponent', () => {
  let component: ClienteRegistroComponent;
  let fixture: ComponentFixture<ClienteRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
