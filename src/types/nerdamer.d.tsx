declare module 'nerdamer' {
    function evaluate(expression: string): any;
    function diff(expression: string, variable?: string): any;
    function integrate(expression: string, variable?: string): any;
    function solve(expression: string, variable?: string): any;
  }