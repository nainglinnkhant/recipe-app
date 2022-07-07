<template>
    <img
        :id="id"
        :src="src"
        :alt="alt" 
        :class="className"
        loading='lazy'
    />
</template>

<script>
import { onMounted } from 'vue';

export default {
    props: ['id', 'src', 'alt', 'className'],
    setup(props) {
        onMounted(() => {
            const image = document.getElementById(props.id);
            if (!image.complete) image.style.background = 'rgba(237, 135, 86, 0.2)';
            image.onerror = () => image.src = 'https://i.stack.imgur.com/y9DpT.jpg';
        });
    },
}
</script>
