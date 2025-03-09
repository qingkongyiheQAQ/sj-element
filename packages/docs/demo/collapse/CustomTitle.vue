<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<template>
  <sj-collapse v-model="activeNames" accordion>
    <sj-collapse-item name="1">
      <template #title>
        <span style="color: var(--sj-color-success)"> 法国 </span>
        <sj-icon icon="edit" />
      </template>
      <div>
         法国是浪漫与艺术的象征，拥有世界著名的博物馆和艺术作品。巴黎的埃菲尔铁塔和香榭丽舍大道是全球浪漫主义的代表。
      </div>
      <div>
        法国不仅有独特的美食文化，从法式大餐到街头小吃，每一道菜肴都充满了艺术感和风味，让人沉醉。
      </div>
    </sj-collapse-item>
    <sj-collapse-item title="中国" name="2">
      <div>
         中国拥有悠久的历史和丰富的文化遗产，长城、故宫等古迹展现了五千年文明的辉煌。而中国的现代化进程也日新月异，成为世界重要的文化和经济大国。
      </div>
      <div>
        中国的美食文化博大精深，五湖四海的地方菜系让每一顿饭都充满了惊喜与独特风味，麻辣的川菜、鲜美的粤菜，令人难忘。
      </div>
    </sj-collapse-item>
    <sj-collapse-item title="英国" name="3">
      <div>
        英国以其深厚的历史底蕴和独特的文化魅力吸引着全球游客。伦敦的博物馆和剧院是世界文化的重要组成部分，而英伦风情也在全球范围内深受喜爱。
      </div>
      <div>
        英国的文学成就卓著，莎士比亚、查尔斯·狄更斯等作家的经典作品流传百世，影响着全球的文学和文化。
      </div>
      <div>
        Easy to identify: the interface should be straightforward, which helps
        the users to identify and frees them from memorizing and recalling.
      </div>
    </sj-collapse-item>
    <sj-collapse-item title="美国" name="4">
      <div>
        美国是一个充满创新和活力的国度，作为全球科技与娱乐中心，硅谷的创新精神和好莱坞的电影魔力深刻影响着世界。
      </div>
      <div>
        美国的自然景观也是其魅力之一，大峡谷、黄石公园等地的壮丽景色吸引了无数游客前来探索这片神奇的土地。
      </div>
    </sj-collapse-item>
  </sj-collapse>
</template>
