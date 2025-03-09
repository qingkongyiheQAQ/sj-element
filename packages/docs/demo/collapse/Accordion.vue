<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<template>
  <sj-collapse v-model="activeNames" accordion>
    <sj-collapse-item title="法国" name="1">
      <div>
        法国，作为世界文化和艺术的重镇，拥有悠久的历史和丰富的文化遗产。巴黎是全球浪漫的象征，而法国的葡萄酒、美食和时尚也是世界知名。
      </div>
      <div>
        法国的艺术和文学影响深远，从印象派画家到哲学家，都在这里留下了深刻的足迹。无论是塞纳河的浪漫，还是普罗旺斯的田园风光，都让人留连忘返。
      </div>
    </sj-collapse-item>
    <sj-collapse-item title="中国" name="2">
      <div>
        中国拥有超过五千年的悠久历史，古老的文明和丰富的文化底蕴令人惊叹。无论是长城、故宫，还是大熊猫，都是中国独特的文化象征。
      </div>
      <div>
        中国的传统艺术、诗词歌赋和哲学思想影响深远，而现代的科技和创新也日新月异，逐渐成为全球经济的重要力量。
      </div>
    </sj-collapse-item>
    <sj-collapse-item title="英国" name="3">
      <div>
        英国，作为世界上最具影响力的国家之一，拥有悠久的历史和辉煌的文化遗产。伦敦是全球的金融中心，也是许多历史建筑和博物馆的所在地。
      </div>
      <div>
        英国以其文学成就著称，莎士比亚、查尔斯·狄更斯等伟大作家在这里留下了不可磨灭的印记。而英国的皇家文化和经典的下午茶，也充满了浓厚的英式风情。
      </div>
    </sj-collapse-item>
    <sj-collapse-item title="美国" name="4">
      <div>
        美国是一个多元文化的熔炉，充满了创新精神和自由氛围。从硅谷的科技创新到好莱坞的电影工业，美国的影响力遍布全球。
      </div>
      <div>
        美国的自然景观也极为壮丽，从大峡谷的雄伟到黄石公园的奇观，展现了大自然的鬼斧神工。美国文化充满活力，是许多人梦想的“机会之地”。
      </div>
    </sj-collapse-item>
  </sj-collapse>
</template>
