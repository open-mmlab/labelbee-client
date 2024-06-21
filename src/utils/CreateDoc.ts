/**
 *  创建dom节点
 */
export default class CreateDoc {
  public tagName: string = '';
  public children: any = [];
  constructor(props: any) {
    this.tagName = props.tagName;
    const children = props.children.map((item: any) => {
      if (typeof item === 'object') {
        item = new CreateDoc(item);
      }
      return item;
    });
    this.children = children;
  }

  public render() {
    const el = document.createElement(this.tagName);
    const children = this.children || [];
    children.forEach((v: any) => {
      const childEl = v instanceof CreateDoc ? v.render() : document.createTextNode(v);
      el.appendChild(childEl);
    });
    return el;
  }
}
