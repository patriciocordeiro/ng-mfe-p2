declare const require: any;

const moduleMap: any = {};

export function loadModule(umdFileName: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {

    if (moduleMap[umdFileName]) {
      resolve(window);
      return;
    }

    const script = document.createElement('script');
    script.src = umdFileName;

    script.onerror = reject;

    script.onload = () => {
      moduleMap[umdFileName] = true;
      resolve(window);
    };

    document.body.append(script);
  });
}

