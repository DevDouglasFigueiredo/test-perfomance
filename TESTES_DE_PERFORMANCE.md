# Testes de Performance — Guia de Estudo

Este documento descreve os principais tipos de testes de performance usados no projeto e serve como material de estudo: objetivo, aplicação prática, exemplos de cenário e recomendações.

Índice
- Breakpoint (Teste de limite)
- Load (Teste de carga)
- Smoke (Teste de fumaça)
- Soak (Teste de resistência)
- Spike (Teste de picos)
- Stress (Teste de estresse)
- Checklist rápido
- Observações e recomendações

## Breakpoint (Teste de limite)

Objetivo
- Descobrir o ponto exato de falha da aplicação, onde o sistema deixa de responder adequadamente.

Aplicação prática
- Utilizado para determinar o limite máximo suportado pela aplicação antes de erros ocorrerem de forma generalizada.

Exemplo de cenário
- Durante uma migração de servidores, o teste de limite ajuda a definir a capacidade necessária de usuários simultâneos no novo ambiente.

Quando usar
- Antes de dimensionar infraestrutura em produção.
- Para definir SLAs realistas quando o comportamento sob carga máxima importa.

Notas
- Execute com incrementos controlados e monitore latência, erros 5xx e tempo de resposta médio.

## Load (Teste de carga)

Objetivo
- Verificar se a aplicação suporta a carga esperada de usuários/requests no dia a dia, mantendo tempos de resposta aceitáveis.

Aplicação prática
- Simula tráfego realista (padrões de uso) com número de VUs e taxa de requisições representativos.

Exemplo de cenário
- Simular tráfego médio e de pico diário (por exemplo, 1000 usuários simultâneos durante uma janela de 30 minutos).

Quando usar
- Antes de lançamentos e para regressão de performance.

Notas
- Foco em métricas como throughput, latência e taxa de erro sob carga esperada.

## Smoke (Teste de fumaça)

Objetivo
- Validar rapidamente que o sistema responde e que os principais fluxos funcionam sob uma carga mínima.

Aplicação prática
- Teste rápido após deploy para garantir que a aplicação está operacional antes de executar testes mais longos.

Exemplo de cenário
- 10–50 VUs por 1–5 minutos exercendo endpoints críticos.

Quando usar
- Automação de pipeline (CI) após deploy.

Notas
- Deve ser rápido e confiável; falhas aqui bloqueiam etapas posteriores.

## Soak (Teste de resistência)

Objetivo
- Avaliar comportamento da aplicação ao longo do tempo sob carga moderada/esperada (checar vazamentos de memória, degradação gradual, estabilidade).

Aplicação prática
- Executado por horas ou dias para detectar problemas que aparecem apenas com tempo (ex.: consumo de memória, crescimento de latência).

Exemplo de cenário
- 500 VUs por 8 horas verificando uso de memória, conexões abertas e latência média.

Quando usar
- Testes de qualidade antes de longas janelas de produção ou após mudanças que possam afetar recursos.

Notas
- Monitore métricas de infraestrutura (CPU, memória, conexões, GC) além das métricas da aplicação.

## Spike (Teste de picos)

Objetivo
- Avaliar como o sistema lida com aumentos bruscos de carga (picos repentinos) e se recupera adequadamente.

Aplicação prática
- Simula eventos como promoções ou incidentes que geram picos de tráfego.

Exemplo de cenário
- Saltos de 100 VUs para 5000 VUs em 30 segundos, manter por 1–5 minutos e observar degradação e recuperação.

Quando usar
- Para validar mecanismos de escalonamento automático, throttling e resiliência.

Notas
- Atenção ao tempo de recuperação e à taxa de erros durante o pico.

## Stress (Teste de estresse)

Objetivo
- Encontrar limites de carga e como a aplicação se comporta quando excedida (falhas controladas, degradação inteligente).

Aplicação prática
- Levar o sistema além da carga máxima prevista para entender modos de falha e prioridades para recuperação.

Exemplo de cenário
- Aumentar VUs continuamente até que o sistema apresente falhas generalizadas, registrar ponto de colapso.

Quando usar
- Para identificar fraquezas arquiteturais e priorizar melhorias críticas.

Notas
- Testes de stress podem causar interrupções — não executar em produção sem mitigação e autorização.

## Checklist rápido (por tipo)

- Breakpoint: incremento gradual, capture taxa de erro e latência.
- Load: simulação realista, duração suficiente para amostrar o comportamento.
- Smoke: curta duração, endpoints essenciais.
- Soak: longa duração, monitoramento de memória e leaks.
- Spike: picos rápidos, ver recuperação e escalonamento.
- Stress: sobe até falha, documentar ponto de colapso.

## Observações e recomendações

- Centralize configurações (baseUrl, tokens) via `setup()` ou variáveis de ambiente (`__ENV`) nos scripts k6.
- Salve resultados e métricas (InfluxDB/Grafana, ou arquivos locais) para análise posterior.
- Comece com smoke/load em ambientes de homologação antes de rodar soak/stress.
- Tenha playbooks de rollback/mitigação se for executar testes em produção.

---



