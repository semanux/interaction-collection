<script setup lang="ts">
    import { useI18n } from "vue-i18n";
    const { t, locale } = useI18n();
    
    </script>
    
    <template>
    <div class="bottom">
      <div>
        © 2022 Semanux
      </div>
    
    
      <i18n-t keypath="bottom.legal.text" tag="div">
        <template #imprint>
          <a :href='t("bottom.legal.imprint-link")'> {{ t("bottom.legal.imprint") }}</a>
        </template>
        <template #dataPrivacy>
          <a :href='t("bottom.legal.data-privacy-link")'> {{ t("bottom.legal.data-privacy") }}</a>
        </template>
      </i18n-t>
    
      <div>
        <select
          v-model="locale"
          name="Locale"
        >
          <option value="en">
            {{ t("bottom.locale.en") }}
          </option>
          <option value="de">
            {{ t("bottom.locale.de") }}
          </option>
        </select>
      </div>
    </div>
    
    </template>
    
    <style scoped>
      .bottom {
        display: grid;
        width: 100%;
        text-align: center;
        margin: 1.5rem 0 0 0;
        grid-template-columns: auto auto auto;
      }
    
      .bottom div:first-child {
        justify-self: start;
      }
    
      .bottom div:last-child {
        justify-self: end;
      }
    </style>
