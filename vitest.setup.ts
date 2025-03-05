// 解决test报错stderr | Alert/Alert.test.tsx > Alert.vue > should support centering text； Could not find one or more icon(s) { prefix: 'fas', iconName: 'xmark' } { }
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);