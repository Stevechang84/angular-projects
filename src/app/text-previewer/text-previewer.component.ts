import { Component } from '@angular/core';
import { PageModel } from '../models/page-model';

@Component({
  selector: 'app-text-previewer',
  templateUrl: './text-previewer.component.html',
  styleUrls: ['./text-previewer.component.sass']
})
export class TextPreviewerComponent {
  inputText: string;
  charPerLine: number;
  linesPerPage: number;
  
  constructor(){
    this.inputText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at laoreet nisl, id blandit orci. Curabitur vitae dignissim odio. Suspendisse ornare vehicula ullamcorper. Mauris eget metus ac lacus condimentum eleifend nec ac odio. Aenean vitae pellentesque risus. Vivamus a dignissim risus. Fusce eu semper arcu. Phasellus molestie nunc sit amet lectus rutrum aliquam eget non dui. Morbi purus arcu, cursus sed risus pulvinar, commodo rhoncus lectus. Integer consequat, ligula eget mattis placerat, mauris tellus dapibus enim, vitae aliquet ante velit euismod ligula.";
    this.charPerLine = 50;
    this.linesPerPage = 5;
  }

  get output(){

    return this.parseText(this.inputText);
  }
  parseText(text:string): PageModel[]{
    let pages: PageModel[] = [];
    let lines: string[] = []
    let words = text.split(' ');
    let line = "";
    let pageIndex = 1;
    do{
      //word will not pass max char length
      if(line.length + words[0].length + 1 < this.charPerLine){
        //add word to current word
        line += `${words[0]} `;
        //remove word from list
        words.shift();
        //if final word, add line to list
        if(!words.length){
          lines.push(line);
        }
      }

      //word will pass max char length
      else{
        lines.push(line);
        line = '';
      }

      //handle pagination
      if(lines.length  >= this.linesPerPage || words.length == 0){
        let page = new PageModel(lines, pageIndex);
        pages.push(page);

        pageIndex++;
        lines = [];
      }

    }while(words.length > 0);
    return pages;
  }

}
