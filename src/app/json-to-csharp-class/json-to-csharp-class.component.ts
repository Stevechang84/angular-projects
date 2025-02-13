import { Component, Input } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
@Component({
  selector: 'app-json-to-csharp-class',
  templateUrl: './json-to-csharp-class.component.html',
  styleUrls: ['./json-to-csharp-class.component.sass'],
  animations: [
    trigger('convertingTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])])
  ]
})
export class JsonToCsharpClassComponent {
  /**
   *
   */
  hasRun: boolean;
  jsonInput: string;
  rootClassName: string;
  validJson: boolean;
  showOutput: boolean;
  codeOutput: string;
  testNum: number;
  get testNumPlusOne() :number {
    return this.testNum + 1;
  }
  setCodeOutput() {
    if (!this.hasRun) this.codeOutput = 'Input Json into left window';
    if (!this.validJson) this.codeOutput = 'Invalid Json Input';
    let output = ``;
    this.createdClasses.reverse().forEach((c) => {
      output += `${c}`
    });
    this.codeOutput = output;
  }
  constructor() {
    this.jsonInput = `{
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      active: true,
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY"
      },
      hobbies: ["reading", "traveling", "photography"],
      petAges: [2, 10, 7],
      additionalAddresses: [
        {
          street: "123 Main St",
          city: "New York",
          state: "NY"
        }, {
          street: "456 South St",
          city: "New Brunswick",
          state: "NJ"
        }
      ]
    }`;
    this.rootClassName = 'Person';
    this.validJson = false;
    this.hasRun = false;
    this.createdClasses = [];
    this.showOutput = true;
    this.codeOutput = 'Input Json into left window';
    this.testNum = 1;
  }
  createdClasses: Array<string>;
  
  isJsonString() {
    try {
      JSON.parse(this.jsonInput);
    } catch (e) {
      return false;
    }
    return true;
  }
  handleConvertClick() {
    this.showOutput = false;
    this.hasRun = true;
    this.validateJson();
    if (!this.validJson) {
      setTimeout(() => {

        this.showOutput = true;
      }, 500);
      return;

    }
    let obj = JSON.parse(this.reformatJsonString(this.jsonInput));
    this.convert(obj, this.rootClassName);
    this.setCodeOutput();
    setTimeout(() => {

      this.showOutput = true;
    }, 500);
  }

  generateCSharpClassFromJson(jsonString: string, className: string) {
    let result = `public class ${className}\n{\n`;
    let obj = JSON.parse(this.reformatJsonString(jsonString));
    for (let key in obj) {
      let type = typeof obj[key];

      switch (type) {
        case 'number':
          result += `    public double ${key} { get; set; }\n`;
          break;
        case 'string':
          result += `    public string ${key} { get; set; }\n`;
          break;
        case 'boolean':
          result += `    public bool ${key} { get; set; }\n`;
          break;
        case 'object':
          result += `    public object ${key} { get; set; }\n`;
          break;
        default:
          result += `    public object ${key} { get; set; }\n`;
      }
    }

    result += '}';

    return result;
  }
  convert(json: any, className: string) {
    this.createdClasses = [];
    this.processObject(json, className);
  }


  processObject(obj: any, className: string) {
    let classString = `public class ${className.charAt(0).toUpperCase() + className.slice(1)}\n{\n`;

    for (let key in obj) {
      let value = obj[key];
      let valueType = typeof value;
      let classTitle = key.charAt(0).toUpperCase() + key.slice(1);
      if (valueType === 'object' && value !== null) {


        //if array create array property
        if (Array.isArray(value)) {
          if (value.length > 0) {
            let innerType = typeof value[0];
            if (innerType === 'object' && innerType !== null) {
              let innerClassName = `${classTitle}`;
              this.processObject(value[0], innerClassName);
              classString += `    public IEnumerable<${innerClassName}> ${key} { get; set; }\n`;
              // continue;
            } else{

              classString += `    public IEnumerable<${this.getTypeString(innerType)}> ${key} { get; set; }\n`;
            }
          }
        }
        else{
          //if object create subobject
          classString += `    public ${classTitle} ${key} { get; set; }\n`;
          this.processObject(value, classTitle);
        }
      }

      else {
        classString += `    public ${this.getTypeString(valueType)} ${key} { get; set; }\n`;
      }
    }

    classString += '}\n\n';
    this.createdClasses.push(classString);
  }


  getTypeString(valueType: string): string {
    switch (valueType) {
      case 'number':
        return 'double';
      case 'string':
        return 'string';
      case 'boolean':
        return 'bool';
      default:
        return 'object';
    }
  }

  validateJson() {
    try {
      this.validJson = JSON.parse(this.reformatJsonString(this.jsonInput));
    } catch (exception) {
      this.validJson = false;
    }
  }

  reformatJsonString(str: string) {
    // Remove newlines and whitespace
    let newStr = str.replace(/\s/g, '');

    // Replace single quotes with double quotes
    newStr = newStr.replace(/'/g, '"');

    // Add double quotes around keys
    newStr = newStr.replace(/(\{|,)\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*:/g, '$1"$2":');

    // Replace unquoted property names with double quotes
    newStr = newStr.replace(/([{,])\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*:/g, '$1"$2":');

    return newStr;
  }
  preventWhiteSpace(event: any) {
    event.preventDefault();
  }

  copyToClipboardClick(){
    let copyText = this.codeOutput;
    navigator.clipboard.writeText(copyText);
  }

  
}
