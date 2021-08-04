import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

const getElementByQuery = (
  fixture: ComponentFixture<AppComponent>,
  query: string
) => {
  const element = fixture.debugElement.query(By.css(query));
  return element.nativeElement as HTMLInputElement;
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render input in first column', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelector('#first-column')?.firstChild?.nodeName
    ).toEqual('INPUT');
  });

  it('should render select in second column ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('#second-column')?.firstChild?.nodeName
    ).toEqual('SELECT');
  });

  it('should render false value in third column', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#third-column')?.textContent).toEqual(
      'false'
    );
  });

  it('should return true when value = 3 and option checkPrime', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const inputNativeElement = getElementByQuery(fixture, 'input');
      inputNativeElement.value = '3';
      inputNativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const resultNativeElement = getElementByQuery(fixture, '#third-column');
      expect(resultNativeElement.textContent).toEqual('true');
    });
  });

  it('should return false when value = 4 and option checkPrime', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const inputNativeElement = getElementByQuery(fixture, 'input');
      inputNativeElement.value = '4';
      inputNativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const resultNativeElement = getElementByQuery(fixture, '#third-column');
      expect(resultNativeElement.textContent).toEqual('false');
    });
  });

  it('should return false when value = 4 then change option = checkFibonacci', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const inputNativeElement = getElementByQuery(fixture, 'input');
      inputNativeElement.value = '4';
      inputNativeElement.dispatchEvent(new Event('input'));

      const selectNativeElement = getElementByQuery(
        fixture,
        '#second-column > select'
      );
      selectNativeElement.value = 'checkFibonacci';
      selectNativeElement.dispatchEvent(new Event('select'));

      fixture.detectChanges();

      const resultElement = fixture.debugElement.query(By.css('#third-column'));
      const resultNativeElement = resultElement.nativeElement as HTMLDivElement;
      expect(resultNativeElement.textContent).toEqual('false');
      expect(inputNativeElement.value).toEqual('4');
      expect(selectNativeElement.value).toEqual('checkFibonacci');
    });
  });

  it('should return true when value = 2 then change option = checkFibonacci', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const inputNativeElement = getElementByQuery(fixture, 'input');
      inputNativeElement.value = '2';
      inputNativeElement.dispatchEvent(new Event('input'));

      const selectNativeElement = getElementByQuery(
        fixture,
        '#second-column > select'
      );
      selectNativeElement.value = 'checkFibonacci';
      selectNativeElement.dispatchEvent(new Event('select'));

      fixture.detectChanges();

      const resultElement = fixture.debugElement.query(By.css('#third-column'));
      const resultNativeElement = resultElement.nativeElement as HTMLDivElement;
      expect(resultNativeElement.textContent).toEqual('true');
      expect(inputNativeElement.value).toEqual('2');
      expect(selectNativeElement.value).toEqual('checkFibonacci');
    });
  });
});
