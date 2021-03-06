<template>
  <div :class="['dao-option-item', {'disabled': disabled, 'active': active}]" @click="handleClick" v-show="matchedFilter">
    <svg class="icon checkmark">
      <use xlink:href="#icon_checkmark-menu-item"></use>
    </svg>
    <span>
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>
<style lang="scss">
  @import './dao-option.scss';
</style>
<script>
  import Emitter from '../../mixins/emitter';

  export default {
    name: 'Option',
    componentName: 'Option',
    mixins: [Emitter],
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      value: {},
      label: [String, Number],
      prefix: String,
    },
    beforeCreate() {
      // 绑定选择事件
      this.$on('status', (val) => {
        this.notActive();
        if (this.value === val) this.isActive();
      });
      // 绑定搜索事件
      this.$on('search', (filter, filterMethod) => {
        if (!filterMethod) {
          this.matchedFilter = (this.label ? this.label.indexOf(filter) > -1 : true);
        } else {
          this.matchedFilter = filterMethod(filter, this.value);
        }
        // 默认根据 label 来搜索
        // 这里往上层传搜索结果，不是一个很好的操作，执行太频繁了
        this.dispatch('Option-group', 'search-result', this.matchedFilter);
      });
    },
    mounted() {
      // 在 option 挂载时将自己的 value 和 slot 中的节点字符串传递给 select
      this.dispatch('Select', 'init', this.value, this.nodesString, this.isActive.bind(this));
    },
    updated() {
      // option 更新之后 maybe 也需要传递一下 value 和 slot 的内容给 select
      this.dispatch('Select', 'init', this.value, this.nodesString, this.isActive.bind(this));
    },
    destroyed() {
      // 在被销毁时将自己的 value 从 select 的 options 中去除
      this.dispatch('Select', 'option-destroy', this.value);
    },
    data() {
      return {
        active: false,
        matchedFilter: true,
      };
    },
    computed: {
      nodesString() {
        // 获取 slot 中的 dom 节点
        const nodes = this.$slots.default;
        let nodesString = this.prefix || '';
        if (nodes) {
          nodes.forEach((n) => {
            if (n.elm.nodeType === 3) {
              nodesString += n.text;
            } else {
              nodesString += n.elm.outerHTML;
            }
          });
        } else {
          nodesString = this.label;
        }
        return nodesString;
      },
    },
    methods: {
      // 处理点击事件
      handleClick() {
        if (this.disabled) return;
        // 触发 select 中的 on-chosen 事件
        this.dispatch('Select', 'on-chosen', this.value);
      },
      // 当前选中
      isActive() {
        this.active = true;
      },
      notActive() {
        this.active = false;
      },
    },
  };
</script>
