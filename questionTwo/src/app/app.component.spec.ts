import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { CallApiService } from './call-api.service';
import { MOCK_CATEGORIES } from './mock';

function getElementByQuery<T extends HTMLElement>(
  fixture: ComponentFixture<AppComponent>,
  query: string
) {
  const element = fixture.debugElement.query(By.css(query));
  return element.nativeElement as T;
}

function getChildrenElementByQuery(
  fixture: ComponentFixture<AppComponent>,
  query: string
) {
  const element = fixture.debugElement.query(By.css(query));
  return element.children;
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule, FormsModule],
      providers: [CallApiService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should filter by value = A', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const service = fixture.debugElement.injector.get(CallApiService);
    spyOn(service, 'getListCategories').and.returnValue(of(MOCK_CATEGORIES));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const inputNativeElement = getElementByQuery<HTMLInputElement>(
        fixture,
        'input'
      );

      inputNativeElement.value = 'A';
      inputNativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const listResult = (
        getChildrenElementByQuery(fixture, '#search-box') || []
      ).filter((el) => el.name === 'p');

      expect(listResult.length).toEqual(5);
      done();
    });
  });

  it('should filter by value = B', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const service = fixture.debugElement.injector.get(CallApiService);
    spyOn(service, 'getListCategories').and.returnValue(of(MOCK_CATEGORIES));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const inputNativeElement = getElementByQuery<HTMLInputElement>(
        fixture,
        'input'
      );

      inputNativeElement.value = 'B';
      inputNativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const listResult = (
        getChildrenElementByQuery(fixture, '#search-box') || []
      ).filter((el) => el.name === 'p');

      expect(listResult.length).toEqual(2);
      done();
    });
  });
});
