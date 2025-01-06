import { TestBed } from '@angular/core/testing';

import { HighlightjsService } from './highlightjs.service';

describe('HighlightjsService', () => {
  let service: HighlightjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighlightjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
