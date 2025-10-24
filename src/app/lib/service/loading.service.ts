import { signal, Injectable, computed } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loadingCount = signal<number>(0);
    private loading = computed(()=> this.loadingCount() !== 0);

    constructor() { }

    count() {
        this.loadingCount.update((val) => ++val);
    }

    down() {
        this.loadingCount.update((val) => --val);
    }

    public isLoading() {
        return this.loading();
    }
}