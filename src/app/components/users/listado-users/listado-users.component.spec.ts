import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoUsersComponent } from './listado-users.component';

describe('ListadoUsersComponent', () => {
  let component: ListadoUsersComponent;
  let fixture: ComponentFixture<ListadoUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
