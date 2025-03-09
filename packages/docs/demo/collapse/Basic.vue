<script setup lang="ts">
import { type CollapseItemName } from "sj-element";
import { ref } from "vue";

const activeNames = ref(["1"]);

function handleChange(val: CollapseItemName[]) {
  console.log(val);
}
</script>

<template>
  <sj-collapse v-model="activeNames" @change="handleChange">
    <sj-collapse-item title="法国" name="1">
      <div>
        法国是浪漫与艺术的代名词，拥有着悠久的历史和丰富的文化遗产。巴黎不仅是全球时尚与艺术的中心，还有着世界著名的博物馆、古老的街道和浪漫的咖啡馆。
      </div>
      <div>
        法国的美食更是世界一流，从美味的法式大餐到简单的街头小吃，每一道菜肴都充满了艺术感和风味。
      </div>
    </sj-collapse-item>
    <sj-collapse-item title="中国" name="2">
      <div>
        中国，是世界上最古老的文明之一，拥有超过五千年的历史。古代的长城、故宫以及丝绸之路等历史遗迹，至今仍然吸引着成千上万的游客。
      </div>
      <div>
        中国的文化博大精深，不仅有传统的诗词歌赋、书法绘画，还有如今蓬勃发展的现代艺术与科技。这里的美食更是丰富多样，遍布大江南北。
      </div>
    </sj-collapse-item>
    <sj-collapse-item title="英国" name="3">
      <div>
        英国以其深厚的历史背景和独特的文化吸引着世界。伦敦，作为全球的金融与文化中心，拥有着无数的博物馆、历史建筑与公园。
      </div>
      <div>
        英国人对文学的热爱远近闻名，莎士比亚、狄更斯等伟大的作家创作出了无数经典作品。此外，英国的下午茶和皇家文化也是其标志性特色。
      </div>
    </sj-collapse-item>
    <sj-collapse-item title="美国" name="4">
      <div>
        美国是一个充满活力和创新的国度。它的文化多元，汇聚了世界各地的移民，创造了一个充满机会与挑战的环境。纽约、洛杉矶等大都市更是世界文化的缩影。
      </div>
      <div>
        美国不仅是全球科技和商业的领袖，它的娱乐产业也具有强大的影响力。好莱坞的电影、纽约的百老汇，都深深影响着全球文化。
      </div>
    </sj-collapse-item>
  </sj-collapse>
</template>
