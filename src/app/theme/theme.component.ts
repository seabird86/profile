import { Component, computed, resource, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Builder } from '@lib/utils/builder.utils';

interface Attribute {
    [key: string]: string;
}

interface OnColor {
    backgroundName: string;
    colorName: string;
}

interface Theme {
    backgrounds: string[];
    colors: string[];
    elevation1?: Attribute;
    elevation2?: Attribute;
    elevation3?: Attribute;
    elevation4?: Attribute;
    elevation5?: Attribute;
}

@Component({
    selector: 'app-theme',
    imports: [],
    templateUrl: './theme.component.html',
    styleUrl: './theme.component.scss'
})
export class ThemeComponent {
    url = signal('https://cdn.jsdelivr.net/npm/@angular/material@19.2.0/prebuilt-themes/azure-blue.css');
    content = httpResource.text(() => this.url());
    theme = computed<Theme>(() => {
        let attributes = [] as Attribute[];
        if (this.content.hasValue()) {
            const str = ("[" + this.content.value()).replace("[html{", "[{\"").replaceAll("}html{", "\"},{\"").replaceAll(": ", "\":\"").replaceAll(";", "\",\"")
                .concat("]")
                .replace("}]", "\"}]");
            const value = JSON.parse(str);
            console.log("json object ", value);
            attributes = value as Attribute[];
        }
        console.log(attributes);
        const builder = Builder<Theme>().colors([]).backgrounds([]);
        attributes.forEach(attr => {
            if (Object.keys(attr).includes('--mat-sys-background')) {
                const keys = Object.keys(attr);
                const onColors = keys.filter(e => e.includes('-on-'));
                const bgrounds = keys.filter(e => !e.includes('-on-'));
                const bgroundsHasOnColor = bgrounds.filter(b =>onColors.find(c => c.replace('-on-', '-') === b))
                .sort();
                const bgroundsOnly = bgrounds.filter(e =>!bgroundsHasOnColor.includes(e)).sort();
                builder.colors(onColors).backgrounds(bgroundsHasOnColor.concat(bgroundsOnly));
            }
        });
        return builder.build();
    });
    getOnColor(bkground: string): string {
        const onColorName = this.theme().colors.find(e => e.includes('-on-') && e.replace('-on-', '-') === bkground);
        return onColorName ? `${onColorName}` : '';
    }

}
