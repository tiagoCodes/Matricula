<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const API_BASE = 'http://localhost:3001'

const nomeCompleto = ref('')
const email = ref('')
const cursoId = ref('')
const cursos = ref([])
const carregandoCursos = ref(false)
const enviando = ref(false)
const sucesso = ref('')
const erroGeral = ref('')

// Validações (UX antecipada)
const nomeErro = computed(() => {
  if (nomeCompleto.value === '') return ''
  return nomeCompleto.value.trim().length < 3 ? 'Informe ao menos 3 caracteres' : ''
})
const emailErro = computed(() => {
  if (email.value === '') return ''
  const ok = /^\S+@\S+\.\S+$/.test(email.value)
  return ok ? '' : 'E-mail inválido'
})
const cursoErro = computed(() => {
  if (cursoId.value === '') return ''
  return cursos.value.some(c => String(c.id) === String(cursoId.value)) ? '' : 'Selecione um curso válido'
})
const formValido = computed(() =>
  nomeCompleto.value.trim().length >= 3 &&
  /^\S+@\S+\.\S+$/.test(email.value) &&
  cursos.value.some(c => String(c.id) === String(cursoId.value))
)

async function carregarCursos () {
  carregandoCursos.value = true
  erroGeral.value = ''
  try {
    const { data } = await axios.get(`${API_BASE}/cursos`)
    cursos.value = data
  } catch (e) {
    erroGeral.value = 'Falha ao carregar cursos. Tente novamente.'
  } finally {
    carregandoCursos.value = false
  }
}

async function enviar () {
  sucesso.value = ''
  erroGeral.value = ''
  if (!formValido.value) {
    erroGeral.value = 'Verifique os campos destacados.'
    return
  }
  enviando.value = true
  try {
    const payload = {
      nomeCompleto: nomeCompleto.value,
      email: email.value,
      cursoId: Number(cursoId.value)
    }
    const { data } = await axios.post(`${API_BASE}/matricula`, payload)
    sucesso.value = data?.mensagem || 'Matrícula realizada com sucesso!'
    nomeCompleto.value = ''
    email.value = ''
    cursoId.value = ''
  } catch (e) {
    const msg = e?.response?.data?.erro
    erroGeral.value = Array.isArray(msg) ? msg.join(', ') : (msg || 'Não foi possível enviar a matrícula.')
  } finally {
    enviando.value = false
  }
}

onMounted(() => {
  carregarCursos()
})
</script>

<template>
  <div class="form-wrapper">
    <h2>Formulário de Matrícula</h2>

    <p v-if="sucesso" class="alert success">{{ sucesso }}</p>
    <p v-if="erroGeral" class="alert error">{{ erroGeral }}</p>

    <label>
      Nome completo
      <input
        type="text"
        v-model.trim="nomeCompleto"
        :class="{ invalid: !!nomeErro }"
        placeholder="Ex.: Tiago Rodrigues"
      />
      <small v-if="nomeErro" class="msg-error">{{ nomeErro }}</small>
    </label>

    <label>
      E-mail
      <input
        type="email"
        v-model.trim="email"
        :class="{ invalid: !!emailErro }"
        placeholder="voce@exemplo.com"
      />
      <small v-if="emailErro" class="msg-error">{{ emailErro }}</small>
    </label>

    <label>
      Curso
      <select v-model="cursoId" :disabled="carregandoCursos" :class="{ invalid: !!cursoErro }">
        <option value="" disabled>Selecione um curso</option>
        <option v-for="c in cursos" :key="c.id" :value="String(c.id)">{{ c.nome }}</option>
      </select>
      <small v-if="cursoErro" class="msg-error">{{ cursoErro }}</small>
    </label>

    <button :disabled="!formValido || enviando" @click="enviar">
      <span v-if="enviando">Enviando...</span>
      <span v-else>Enviar matrícula</span>
    </button>
  </div>
</template>

<style scoped>
.form-wrapper { max-width: 480px; margin: 2rem auto; display: grid; gap: 1rem;}
label { display: grid; gap: .25rem; font-weight: 600; }
input, select {
  padding: .6rem .75rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  outline: none;
  transition: border-color .2s, box-shadow .2s;
}
input:focus, select:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.2); }
.invalid { border-color: #ef4444 !important; }
.msg-error { color: #ef4444; font-weight: 500; }
.alert { padding: .75rem; border-radius: 8px; }
.alert.success { background: #ecfdf5; color: #065f46; }
.alert.error { background: #fef2f2; color: #991b1b; }
button {
  padding: .75rem 1rem; font-weight: 700; color: white; background: #3b82f6;
  border: none; border-radius: 8px; cursor: pointer; transition: filter .2s, transform .02s;
}
button:disabled { opacity: .7; cursor: not-allowed; }
button:active { transform: translateY(1px); filter: brightness(.95); }
</style>
