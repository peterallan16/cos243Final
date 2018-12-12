<v-text-field
        v-model="email"
        v-bind:rules="rules.email"
        error-count="10"
        type="email"
        label="Your email address"
>
</v-text-field>
<v-text-field
        v-model="password"
        v-bind:rules="rules.password"
        error-count="10"
        type="password"
        label="Non-trivial password"
        required
>