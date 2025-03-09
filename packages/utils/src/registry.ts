type AnyComponentMap = Record<string, React.FunctionComponent<any>>;
export type ComponentProps<C extends AnyComponentMap, K extends keyof C> = React.ComponentProps<C[K]>;
export type ComponentReturn<C extends AnyComponentMap, K extends keyof C> = ReturnType<C[K]>;
export type Component<C extends AnyComponentMap, K extends keyof C> = (props: ComponentProps<C, K>) => ComponentReturn<C, K>;

export type Registry<C extends Record<string, React.FunctionComponent<any>>> = {
  components: C;
  get<K extends keyof C>(key: K): Component<C, K>; // C[K] is not used here because it causes type problems when used in `instantiate`
  instantiate<K extends keyof C>(key: K, props: ComponentProps<C, K>): ComponentReturn<C, K>;
}

export function createComponentRegistry<C extends Record<string, React.FunctionComponent<any>>>(components: C): Registry<C> {
  return {
    components,
    get(key) {
      return components[key] as Component<C, typeof key>;
    },
    instantiate(key, props) {
      const component = this.get(key);
      return component(props);
    },
  }
}
