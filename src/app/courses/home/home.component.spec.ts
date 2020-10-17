import {
    async,
    ComponentFixture,
    fakeAsync,
    flush,
    flushMicrotasks,
    TestBed,
} from '@angular/core/testing';
import { CoursesModule } from '../courses.module';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { CoursesService } from '../services/courses.service';
import { HttpClient } from '@angular/common/http';
import { COURSES } from '../../../../server/db-data';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { click } from '../common/test-utils';

fdescribe('HomeComponent', () => {
    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;
    let el: DebugElement;
    let coursesService: any;

    // const beginnerCourses = setupCourses().filter(
    //     (course) => course.category === 'BEGINNER'
    // );
    // const advancedCourses = setupCourses().filter(
    //     (course) => course.category === 'ADVANCED'
    // );
    const allCourses = setupCourses();

    beforeEach(async(() => {
        const coursesServiceSpy = jasmine.createSpyObj('CoursesService', [
            'findAllCourses',
        ]);
        TestBed.configureTestingModule({
            imports: [CoursesModule, NoopAnimationsModule],
            providers: [
                {
                    provide: CoursesService,
                    useValue: coursesServiceSpy,
                },
            ],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(HomeComponent);
                component = fixture.componentInstance;
                el = fixture.debugElement;
                coursesService = TestBed.inject(CoursesService);
            });
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display only beginner courses', () => {
        pending();
    });

    it('should display only advanced courses', () => {
        pending();
    });

    it('should display both tabs', () => {
        pending();
    });

    fit('should display advanced courses when tab clicked (fakeAsync)', fakeAsync(() => {
        coursesService.findAllCourses.and.returnValue(of(allCourses));
        fixture.detectChanges();
        const tabs = el.queryAll(By.css('.mat-tab-label'));
        click(tabs[1]);
        fixture.detectChanges();
        flush();
        const cardTitles = el.queryAll(
            By.css('.mat-tab-body-active .mat-card-title')
        );
        expect(cardTitles.length).toBeGreaterThan(
            0,
            'Could not find card titles'
        );
        expect(cardTitles[0].nativeElement.textContent).toContain(
            'Angular Security Course'
        );
    }));

    fit('should display advanced courses when tab clicked (async)', async(() => {
        coursesService.findAllCourses.and.returnValue(of(allCourses));
        fixture.detectChanges();
        const tabs = el.queryAll(By.css('.mat-tab-label'));
        click(tabs[1]);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            console.log('called whenStable()');
            const cardTitles = el.queryAll(
                By.css('.mat-tab-body-active .mat-card-title')
            );
            expect(cardTitles.length).toBeGreaterThan(
                0,
                'Could not find card titles'
            );
            expect(cardTitles[0].nativeElement.textContent).toContain(
                'Angular Security Course'
            );
        });
    }));
});
