import {ABAPObject, ITextElement} from "./_abap_object";
import {FunctionModuleDefinition} from "../abap/types";
import {xmlToArray} from "../xml_utils";
import {ABAPFile} from "../files";
import * as xmljs from "xml-js";

export class FunctionGroup extends ABAPObject {

  public getType(): string {
    return "FUGR";
  }

  public getModules(): FunctionModuleDefinition[] {
    const xml = this.getXML();
    if (xml === undefined) {
      return [];
    }
    const parsed = this.parseXML();

    return this.parseModules(parsed);
  }

  public getIncludeFiles(): {file: ABAPFile, name: string}[] {
    const ret = [];
    const includes = this.getIncludes();
    for (const f of this.getABAPFiles()) {
      for (const i of includes) {
        if (i.startsWith("L") && f.getFilename().includes(i.toLowerCase())) {
          ret.push({
            file: f,
            name: i});
        }
      }
    }
    return ret;
  }
/*
  public getModuleFiles(): ABAPFile[] {

  }
*/
  public getMainABAPFile(): ABAPFile | undefined {
    const search = this.getName() + ".fugr.sapl";
    for (const f of this.getABAPFiles()) {
      if (f.getFilename().includes(search.toLowerCase())) {
        return f;
      }
    }
    return undefined;
  }

/*
  public isInclude(f: ABAPFile): boolean {
    const search = this.getName() + ".fugr.sapl" + this.getName() + ".abap";
    if (f.getFilename().endsWith(search.toLowerCase())) {
      return false;
    }
    return true;
  }
*/
  public getIncludes(): string[] {
    const xml = this.getXML();
    if (xml === undefined) {
      return [];
    }

    const parsed = this.parseXML();
    const includes = parsed.abapGit["asx:abap"]["asx:values"].INCLUDES;

    const ret: string[] = [];
    for (const i of xmlToArray(includes.SOBJ_NAME)) {
      ret.push(i._text);
    }

    return ret;
  }

  public getModule(name: string): FunctionModuleDefinition | undefined {
    for (const mod of this.getModules()) {
      if (mod.getName().toUpperCase() === name.toUpperCase()) {
        return mod;
      }
    }
    return undefined;
  }

  private parseModules(data: any): FunctionModuleDefinition[] {
    const ret: FunctionModuleDefinition[] = [];

    const functions = data.abapGit["asx:abap"]["asx:values"].FUNCTIONS;
    for (const module of xmlToArray(functions.item)) {
      ret.push(new FunctionModuleDefinition(module));
    }

    return ret;
  }

  public getTexts(): ITextElement[] {
    const found = this.findTextFile();
    if (found === undefined) {
      return [];
    }

    const parsed = xmljs.xml2js(found.getRaw(), {compact: true});
    return this.findTexts(parsed);
  }

  private findTextFile() {
    const search = this.getName() + ".fugr.sapl" + this.getName() + ".xml";
    for (const f of this.files) {
      if (f.getFilename().includes(search.toLowerCase())) {
        return f;
      }
    }
    return undefined;
  }

}