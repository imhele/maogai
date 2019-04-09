import moment, { Moment } from 'moment';

export enum DebugType {
  ERROR = 'ERROR',
  INFO = 'INFO',
  WARN = 'WARN',
}

export const debugOutput: [Moment, DebugType, string][] = [];

class Closure {
  pointer: number = 0;
  values: string[] = [];
  output: string[] = [];
  cls: Map<string, { proto?: string; methods: string[] }> = new Map();

  get() {
    if (!this.pointer) {
      debugOutput.push([moment(), DebugType.ERROR, 'There are no variables available.']);
      throw '[ERROR] There are no variables available.';
    }
    this.pointer--;
    return this.values[this.pointer];
  }

  set(value: string) {
    this.pointer = this.values.push(value);
  }

  print(str: string) {
    return this.output.push(str);
  }

  setCls(name: string, proto?: string) {
    if (this.cls.has(name)) {
      debugOutput.push([
        moment(),
        DebugType.WARN,
        `Class named ${name} is defined and will be rewritten.`,
      ]);
    }
    if (proto && !this.cls.has(proto)) {
      debugOutput.push([moment(), DebugType.ERROR, `Unknown class named ${proto}`]);
      throw `[ERROR] Unknown class named ${proto}`;
    }
    this.cls.set(name, { methods: [], proto });
  }

  setClsMethods(name: string, methods: string[]) {
    this.assertClsExists(name);
    debugOutput.push([moment(), DebugType.INFO, `Methods of class ${name} will be rewritten.`]);
    this.cls.get(name).methods = methods;
  }

  getClsMethods(name: string) {
    this.assertClsExists(name);
    const res: string[] = [];
    while (name) {
      res.push(...this.cls.get(name).methods);
      name = this.cls.get(name).proto;
    }
    return res;
  }

  private assertClsExists(name: string) {
    if (!this.cls.has(name)) {
      debugOutput.push([moment(), DebugType.ERROR, `Unknown class named ${name}`]);
      throw `[ERROR] Unknown class named ${name}`;
    }
  }
}

const hasVar = (code: string, closure: Closure): boolean => {
  const newVar = /在\S*?上写[\s：:]?([\s\S]*)/.exec(code);
  if (newVar) {
    closure.set(newVar[1]);
    return true;
  }
  const newCls = /(?:提出|确立)了?(?:基于(\S*?)的)?(\S*?(?:思想|主义|方针))/.exec(code);
  if (newCls) {
    closure.setCls(newCls[2], newCls[1]);
    return true;
  }
  const newMethods = /(\S*?)包含(\S*)方法/.exec(code);
  if (newMethods) {
    closure.setClsMethods(newMethods[1], newMethods[2].split(/[，、,\s]/));
    return true;
  }
  return false;
};

const hasOutput = (code: string, closure: Closure): boolean => {
  const outputStr = /([\s\S]*?拿起)?\S*?(?:开始)?[读说][道了：:]?([\s\S]*)/.exec(code);
  if (outputStr) {
    if (!outputStr[1]) closure.print(outputStr[2]);
    else closure.print(closure.get());
    return true;
  }
  const getCls = /(\S*(?:思想|主义|方针))的?方法有哪些\S*/.exec(code);
  if (getCls) {
    closure.print(closure.getClsMethods(getCls[1]).join('\n'));
    return true;
  }
  return false;
};

const func: ((code: string, closure: Closure) => boolean)[] = [hasVar, hasOutput];

export default (codeStr: string) => {
  try {
    const closure = new Closure();
    debugOutput.push([moment(), DebugType.INFO, 'Start run.']);
    const codeLines = codeStr.split(/[。；？!]/).filter(line => line);
    codeLines.forEach(line => func.some(f => f(line, closure)));
    return closure.output;
  } catch (error) {
    if (typeof error === 'string') return [error];
    debugOutput.push([moment(), DebugType.ERROR, 'Unknown error.']);
    return ['[ERROR] Unknown error.'];
  }
};
