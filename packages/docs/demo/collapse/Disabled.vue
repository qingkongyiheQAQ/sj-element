<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<template>
  <sj-collapse v-model="activeNames">
    <sj-collapse-item title="法国" name="1">
      <div>
        法国，以其浪漫的氛围和悠久的历史闻名。巴黎的埃菲尔铁塔、卢浮宫和香榭丽舍大街，吸引了世界各地的游客。
      </div>
      <div>
        法国人注重优雅和艺术，浪漫的文化深深植根于日常生活中，从美食到时尚，无不体现着细致入微的设计感。
      </div>
    </sj-collapse-item>
    <sj-collapse-item title="中国" name="2" >
      <div>
        中国，拥有五千年的历史，是世界上最古老的文明之一。这里的哲学、诗词和艺术深刻影响着全球。
      </div>
      <div>
       中国的传统文化博大精深，从孔子思想到道家哲学，每一部分都为世界文化遗产贡献了重要的智慧。
      </div>
    </sj-collapse-item>
    <sj-collapse-item title="英国" name="3">
      <div>
        英国是文学、历史和文化的摇篮。莎士比亚、查尔斯·狄更斯等文学巨匠，创造了许多永恒的经典作品。
      </div>
      <div>
        英国的建筑、博物馆、音乐会等，都是世界文化的瑰宝，英国的历史气息和皇家传统也令人神往。
      </div>
    </sj-collapse-item>
    <sj-collapse-item title="美国 禁了" name="4" disabled>
      <div>
        美国是现代文化、科技和经济的重心。这里的创新精神、自由思想和无限机遇吸引了全球各地的人才。
      </div>
      <div>
        美国的电影、音乐和科技产业也深刻影响了全球文化，硅谷的创新力与好莱坞的娱乐产业，使得美国成为世界的文化输出大国。
      </div>
    </sj-collapse-item>
  </sj-collapse>
</template>
