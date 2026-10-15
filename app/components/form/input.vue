<template>
  <UFormField
    :name="name"
    :description="description"
    :help="help"
    :hint="hint"
    :size="size"
    :error="errors[0]"
    :ui="formFieldUi"
    v-bind="$attrs"
  >
    <UInput
      v-model="value"
      v-bind="$attrs"
      :color="errors.length ? 'error' : color"
      :highlight="!!errors.length"
      :ui="{
        base: [
          'px-4 bg-transparent rounded-none !ring-transparent h-[50px] !text-[#484848] !text-base !border-b !border-light-gray focus:!border-primary active:!border-primary focus-visible:!border-primary placeholder:text-[#484848]',

          errors.length
            ? '!border-red-500 focus:!border-red-500 active:!border-red-500 focus-visible:!border-red-500'
            : '!border-typography focus:!border-primary active:!border-primary focus-visible:!border-primary',
        ],
      }"
    >
      <template v-if="$slots.leading" #leading>
        <slot name="leading" />
      </template>

      <template v-if="$slots.default" #default>
        <slot />
      </template>

      <template v-if="$slots.trailing" #trailing>
        <slot name="trailing" />
      </template>
    </UInput>
  </UFormField>
</template>

<script setup lang="ts">
import type { InputProps } from "@nuxt/ui";

defineOptions({
  inheritAttrs: false,
});

// Extend InputProps and add our custom form field props
interface Props extends /* @vue-ignore */ Partial<InputProps> {
  name: string;
  label?: string;
  description?: string;
  help?: string;
  hint?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  description: "",
  help: "",
  hint: "",
  required: false,
});

// Custom validation logic
const { value, errors } = useCustomField(props.name);

// Computed values for size and color with defaults
const size = computed(() => props.size ?? "md");
const color = computed(() => props.color ?? "primary");

// Custom form field styling
const formFieldUi = computed(() => ({
  root: "mb-4",
  label: "!text-base font-medium mb-2",
  error: "text-error text-sm",
  help: "text-gray-500 text-sm",
}));
</script>
