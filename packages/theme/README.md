## 主题定制

### 引入

``` js
import Vue from 'vue';
import { Button} from 'momo-ui';
Vue.use(Button);
```

### 基础用法

<section>
<mo-button>默认按钮</mo-button>
<mo-button type="primary">主要按钮</mo-button>
<mo-button type="error">错误按钮</mo-button>
<mo-button :disabled="true">禁用按钮</mo-button>
</section>


``` vue
<mo-button>默认按钮</mo-button>
<mo-button type="primary">主要按钮</mo-button>
<mo-button type="error">错误按钮</mo-button>
<mo-button :disabled="true">禁用按钮</mo-button>
```

### 不同尺寸

<section>
<mo-button size="large">大型按钮</mo-button>
<mo-button size="small">小型按钮</mo-button>
</section>

``` vue
<mo-button size="large">大型按钮</mo-button>
<mo-button size="small">小型按钮</mo-button>
```

### 加载中

<section>
<mo-button type="primary" loading>加载按钮</mo-button>
</section>

``` vue
<mo-button type="primary" loading>加载按钮</mo-button>
```

### 图标按钮

<section>
<mo-button icon="shanchu1"></mo-button>
</section>

``` vue
<mo-button type="primary" icom="loading"></mo-button>
```

### Attributes

| 参数     | 说明     | 类型    | 可选值                                             | 默认值 | 必填 |
| -------- | -------- | ------- | -------------------------------------------------- | ------ | ---- |
| type     | 类型     | String  | primary / success / warning / danger / info / text | —      | no   |
| size     | 大小     | String  | large/medium/small                                 | medium | no   |
| loading  | 加载中   | Boolean | true/false                                         | false  | no   |
| disabled | 禁用     | Boolean | true/false                                         | false  | no   |
| icon     | 图标类名 | String  | 参见Icon组件                                       | —      | no   |


>2222