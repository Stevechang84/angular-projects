export class PageModel {
    lines: string[];
    pageIndex: number;
    constructor(lines: string[], index: number){
        this.lines = lines;
        this.pageIndex = index;
    }
}
