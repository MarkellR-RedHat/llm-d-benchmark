/* ============================================
   llm-d Benchmark: Charts, Animations & Interactivity
   Warm Storytelling Edition
   ============================================ */

(function () {
  'use strict';

  // ---- Benchmark data (inlined to work on file:// protocol) ----
  var DATA = {"metadata":{"title":"llm-d KV-Cache-Aware Routing Benchmark","author":"Markell Rawls","date":"2026-06-23","model":"Meta Llama 3.1 70B Instruct (FP8-dynamic, RedHatAI)","hardware":"3x NVIDIA H200 141GB HBM3e GPUs on single node","platform":"Red Hat OpenShift 4.21.11 with llm-d (CNCF Sandbox)"},"charts":{"full_scaling_curve":{"series":{"cold_start_no_cache":[{"x":500,"y":87.89},{"x":1000,"y":109.55},{"x":2000,"y":218.57},{"x":4000,"y":369.34},{"x":8000,"y":758.26},{"x":12000,"y":1269.55},{"x":16000,"y":1636.96},{"x":24000,"y":2692.05},{"x":32000,"y":3742.47}],"cache_hit":[{"x":500,"y":32.66},{"x":1000,"y":33.06},{"x":2000,"y":35.75},{"x":4000,"y":37.9},{"x":8000,"y":43.95},{"x":12000,"y":49.06},{"x":16000,"y":55.34},{"x":24000,"y":65.84},{"x":32000,"y":78.87}]}},"context_scaling_curve":{"series":{"cold_start":[{"x":500,"y":87.89},{"x":1000,"y":109.55},{"x":2000,"y":218.57},{"x":4000,"y":369.34},{"x":8000,"y":758.26},{"x":12000,"y":1269.55},{"x":16000,"y":1636.96},{"x":24000,"y":2692.05},{"x":32000,"y":3742.47}],"cache_hit":[{"x":500,"y":32.66},{"x":1000,"y":33.06},{"x":2000,"y":35.75},{"x":4000,"y":37.9},{"x":8000,"y":43.95},{"x":12000,"y":49.06},{"x":16000,"y":55.34},{"x":24000,"y":65.84},{"x":32000,"y":78.87}]}},"speedup_bar_chart":{"bars":[{"label":"500","value":2.69},{"label":"1K","value":3.31},{"label":"2K","value":6.11},{"label":"4K","value":9.75},{"label":"8K","value":17.25},{"label":"12K","value":25.88},{"label":"16K","value":29.58},{"label":"24K","value":40.89},{"label":"32K","value":47.45}]},"concurrent_per_turn":{"series":{"round_robin":[{"x":1,"y":178.87},{"x":2,"y":253.77},{"x":3,"y":247.99},{"x":4,"y":189.71},{"x":5,"y":230.32}],"cache_aware":[{"x":1,"y":51.66},{"x":2,"y":52.71},{"x":3,"y":54.55},{"x":4,"y":57.95},{"x":5,"y":60.81}]}},"warmup_curve":{"series":{"round_robin":[{"x":1,"y":235.17},{"x":2,"y":238.29},{"x":3,"y":235.41},{"x":4,"y":42.31},{"x":5,"y":41.57},{"x":6,"y":43.43},{"x":7,"y":42.39},{"x":8,"y":43.36},{"x":9,"y":42.44},{"x":10,"y":42.13},{"x":11,"y":42.46},{"x":12,"y":43.36},{"x":13,"y":41.59},{"x":14,"y":42.25},{"x":15,"y":41.44},{"x":16,"y":42.06},{"x":17,"y":42.9},{"x":18,"y":41.92},{"x":19,"y":41.87},{"x":20,"y":42.27}],"cache_aware":[{"x":1,"y":37.95},{"x":2,"y":41.27},{"x":3,"y":34.62},{"x":4,"y":36.25},{"x":5,"y":40.79},{"x":6,"y":35.8},{"x":7,"y":35.68},{"x":8,"y":41.8},{"x":9,"y":36.09},{"x":10,"y":35.02},{"x":11,"y":35.3},{"x":12,"y":35.43},{"x":13,"y":35.76},{"x":14,"y":35.19},{"x":15,"y":34.97},{"x":16,"y":35.22},{"x":17,"y":35.0},{"x":18,"y":34.79},{"x":19,"y":35.12},{"x":20,"y":34.72}]}},"agentic_chain_12step":{"series":{"round_robin":[{"x":1,"y":678.93,"context_tokens":7295},{"x":2,"y":730.44,"context_tokens":7550},{"x":3,"y":748.37,"context_tokens":7801},{"x":4,"y":148.57,"context_tokens":8061},{"x":5,"y":152.84,"context_tokens":8313},{"x":6,"y":152.18,"context_tokens":8600},{"x":7,"y":152.23,"context_tokens":8875},{"x":8,"y":150.1,"context_tokens":9154},{"x":9,"y":141.87,"context_tokens":9404},{"x":10,"y":147.43,"context_tokens":9730},{"x":11,"y":143.13,"context_tokens":10003},{"x":12,"y":143.79,"context_tokens":10300}],"cache_aware":[{"x":1,"y":43.86,"context_tokens":7294},{"x":2,"y":68.93,"context_tokens":7549},{"x":3,"y":71.59,"context_tokens":7800},{"x":4,"y":71.04,"context_tokens":8059},{"x":5,"y":71.37,"context_tokens":8310},{"x":6,"y":73.13,"context_tokens":8598},{"x":7,"y":65.8,"context_tokens":8873},{"x":8,"y":67.97,"context_tokens":9151},{"x":9,"y":67.02,"context_tokens":9413},{"x":10,"y":72.57,"context_tokens":9736},{"x":11,"y":122.03,"context_tokens":10013},{"x":12,"y":66.41,"context_tokens":10305}]}},"agentic_chain_8step_original":{"series":{"round_robin":[{"x":1,"y":41.63,"context_tokens":2646},{"x":2,"y":79.64,"context_tokens":2914},{"x":3,"y":84.17,"context_tokens":3156},{"x":4,"y":135.43,"context_tokens":3414},{"x":5,"y":138.63,"context_tokens":3646},{"x":6,"y":137.9,"context_tokens":3891},{"x":7,"y":137.76,"context_tokens":4150},{"x":8,"y":144.8,"context_tokens":4421}],"cache_aware":[{"x":1,"y":38.92,"context_tokens":2646},{"x":2,"y":52.44,"context_tokens":2914},{"x":3,"y":64.34,"context_tokens":3156},{"x":4,"y":43.35,"context_tokens":3414},{"x":5,"y":42.67,"context_tokens":3646},{"x":6,"y":44.2,"context_tokens":3891},{"x":7,"y":55.41,"context_tokens":4150},{"x":8,"y":57.42,"context_tokens":4421}]}},"multi_turn_conversation":{"series":{"round_robin":[{"x":1,"y":42.93},{"x":2,"y":64.75},{"x":3,"y":56.83},{"x":4,"y":52.59},{"x":5,"y":53.6},{"x":6,"y":55.34},{"x":7,"y":54.36},{"x":8,"y":57.24},{"x":9,"y":56.47},{"x":10,"y":55.5}],"cache_aware":[{"x":1,"y":39.02},{"x":2,"y":40.17},{"x":3,"y":42.99},{"x":4,"y":48.17},{"x":5,"y":42.88},{"x":6,"y":41.76},{"x":7,"y":50.74},{"x":8,"y":50.35},{"x":9,"y":48.0},{"x":10,"y":47.38}]}},"fleet_warmup_projection":{"series":{"round_robin_8k":[{"x":3,"y":2.27},{"x":10,"y":7.58},{"x":25,"y":18.96},{"x":50,"y":37.91},{"x":100,"y":75.83},{"x":200,"y":151.65}],"cache_aware_8k":[{"x":3,"y":0.76},{"x":10,"y":0.76},{"x":25,"y":0.76},{"x":50,"y":0.76},{"x":100,"y":0.76},{"x":200,"y":0.76}],"round_robin_32k":[{"x":3,"y":11.23},{"x":10,"y":37.42},{"x":25,"y":93.56},{"x":50,"y":187.12},{"x":100,"y":374.25},{"x":200,"y":748.49}],"cache_aware_32k":[{"x":3,"y":3.74},{"x":10,"y":3.74},{"x":25,"y":3.74},{"x":50,"y":3.74},{"x":100,"y":3.74},{"x":200,"y":3.74}]}}}};

  // ---- Warm color palette ----
  var COLORS = {
    rr: '#d4574e',
    rrDim: 'rgba(212, 87, 78, 0.08)',
    ca: '#4a90d9',
    caDim: 'rgba(74, 144, 217, 0.08)',
    cold: '#c07844',
    coldDim: 'rgba(192, 120, 68, 0.08)',
    accent: '#4a90d9',
    accentDim: 'rgba(74, 144, 217, 0.08)',
    textPrimary: '#2d2a26',
    textSecondary: '#5c574f',
    textMuted: '#8a847b',
    gridLine: 'rgba(45, 42, 38, 0.06)',
    surface: '#ffffff',
  };

  // ---- Chart.js global defaults ----
  Chart.defaults.color = COLORS.textSecondary;
  Chart.defaults.borderColor = COLORS.gridLine;
  Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  Chart.defaults.font.size = 13;
  Chart.defaults.plugins.tooltip.backgroundColor = '#fffdf9';
  Chart.defaults.plugins.tooltip.titleColor = COLORS.textPrimary;
  Chart.defaults.plugins.tooltip.bodyColor = COLORS.textSecondary;
  Chart.defaults.plugins.tooltip.borderColor = '#e8e4df';
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.cornerRadius = 10;
  Chart.defaults.plugins.tooltip.padding = 14;
  Chart.defaults.plugins.tooltip.displayColors = true;
  Chart.defaults.plugins.tooltip.boxPadding = 4;
  Chart.defaults.plugins.tooltip.titleFont = { weight: 'bold', family: "'Inter', sans-serif" };
  Chart.defaults.plugins.legend.labels.usePointStyle = false;
  Chart.defaults.plugins.legend.labels.boxWidth = 14;
  Chart.defaults.plugins.legend.labels.boxHeight = 4;
  Chart.defaults.plugins.legend.labels.padding = 20;
  Chart.defaults.plugins.legend.labels.font = { family: "'Inter', sans-serif", weight: '600' };

  // ---- Chart instances ----
  var charts = {};

  // ---- Shared helpers ----
  function msTooltipLabel(context) {
    return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + ' ms';
  }

  function baseScaleOptions(xLabel, yLabel, opts) {
    var result = {
      x: {
        title: { display: true, text: xLabel, color: COLORS.textSecondary, font: { weight: '700', family: "'Inter', sans-serif" } },
        grid: { color: COLORS.gridLine, drawBorder: false },
        ticks: { color: COLORS.textSecondary },
      },
      y: {
        title: { display: true, text: yLabel, color: COLORS.textSecondary, font: { weight: '700', family: "'Inter', sans-serif" } },
        grid: { color: COLORS.gridLine, drawBorder: false },
        ticks: { color: COLORS.textSecondary },
        beginAtZero: true,
      },
    };
    if (opts && opts.xType) result.x.type = opts.xType;
    if (opts && opts.logY) result.y.type = 'logarithmic';
    return result;
  }

  // ---- Tab switching (updated for chart-btn class) ----
  function initTabs() {
    var tabs = document.querySelectorAll('.chart-btn');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        document.querySelectorAll('.chart-panel').forEach(function (p) {
          p.classList.remove('active');
        });

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        var chartKey = tab.getAttribute('data-chart');
        var panel = document.getElementById('panel-' + chartKey);
        if (panel) panel.classList.add('active');
        if (charts[chartKey]) charts[chartKey].resize();
      });
    });
  }

  // ---- Animated counter ----
  function animateCounter(el, target, suffix, duration) {
    suffix = suffix || '';
    duration = duration || 2000;
    var startTime = null;
    var startVal = 0;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = startVal + (target - startVal) * eased;

      if (target % 1 !== 0) {
        el.textContent = current.toFixed(1) + suffix;
      } else {
        el.textContent = Math.round(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // ---- Scroll reveal ----
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  // ---- Hero counter animation ----
  function initHeroCounter() {
    var heroNum = document.querySelector('.hero-number');
    if (!heroNum) return;

    if (!('IntersectionObserver' in window)) {
      heroNum.textContent = '47.5x';
      return;
    }

    heroNum.textContent = '0x';
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(heroNum, 47.5, 'x', 2200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(heroNum);
  }

  // ---- Scroll progress bar ----
  function initScrollProgress() {
    var bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', function () {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrolled = window.scrollY;
      var pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  // ---- Chart builders ----
  function buildScalingChart(data) {
    var ctx = document.getElementById('chart-scaling');
    if (!ctx) return;

    var chartData = data.charts.full_scaling_curve || data.charts.context_scaling_curve;
    var coldSeries = chartData.series.cold_start_no_cache || chartData.series.cold_start;
    var warmSeries = chartData.series.cache_hit;

    charts.scaling = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Cold Start (no cache)',
            data: coldSeries.map(function (p) { return { x: p.x, y: p.y }; }),
            borderColor: COLORS.rr,
            backgroundColor: COLORS.rrDim,
            borderWidth: 2.5,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#fff',
            pointBorderColor: COLORS.rr,
            pointBorderWidth: 2,
            tension: 0.3,
            fill: true,
          },
          {
            label: 'Cache Hit (cache-aware)',
            data: warmSeries.map(function (p) { return { x: p.x, y: p.y }; }),
            borderColor: COLORS.ca,
            backgroundColor: COLORS.caDim,
            borderWidth: 2.5,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#fff',
            pointBorderColor: COLORS.ca,
            pointBorderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        scales: baseScaleOptions('Context Length (tokens)', 'Time to First Token (ms)', { xType: 'linear' }),
        plugins: {
          tooltip: {
            callbacks: {
              title: function (items) { return items[0].parsed.x.toLocaleString() + ' tokens'; },
              label: msTooltipLabel,
              afterBody: function (items) {
                if (items.length >= 2) {
                  var cold = items[0].parsed.y;
                  var warm = items[1].parsed.y;
                  if (cold > 0 && warm > 0) return 'Speedup: ' + (cold / warm).toFixed(1) + 'x';
                }
                return '';
              },
            },
          },
        },
      },
    });
  }

  function buildSpeedupChart(data) {
    var ctx = document.getElementById('chart-speedup');
    if (!ctx) return;

    var bars = data.charts.speedup_bar_chart.bars;

    charts.speedup = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: bars.map(function (b) { return b.label; }),
        datasets: [{
          label: 'Speedup Factor',
          data: bars.map(function (b) { return b.value; }),
          backgroundColor: bars.map(function (b) {
            var ratio = Math.min(b.value / 50, 1);
            var r = Math.round(74 + (58 - 74) * ratio);
            var g = Math.round(144 + (123 - 144) * ratio);
            var bVal = Math.round(217 + (200 - 217) * ratio);
            return 'rgba(' + r + ',' + g + ',' + bVal + ',' + (0.55 + 0.35 * ratio) + ')';
          }),
          borderColor: bars.map(function (b) {
            var ratio = Math.min(b.value / 50, 1);
            return ratio > 0.5 ? '#3a7bc8' : COLORS.ca;
          }),
          borderWidth: 1.5,
          borderRadius: 6,
          barPercentage: 0.7,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: baseScaleOptions('Context Length (tokens)', 'Speedup Factor (x)'),
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.parsed.y.toFixed(1) + 'x faster with cache-aware routing';
              },
            },
          },
          legend: { display: false },
        },
      },
    });
  }

  function buildConcurrentChart(data) {
    var ctx = document.getElementById('chart-concurrent');
    if (!ctx) return;
    var series = data.charts.concurrent_per_turn.series;

    charts.concurrent = new Chart(ctx, {
      type: 'line',
      data: {
        labels: series.round_robin.map(function (p) { return 'Turn ' + p.x; }),
        datasets: [
          {
            label: 'Round-Robin',
            data: series.round_robin.map(function (p) { return p.y; }),
            borderColor: COLORS.rr,
            backgroundColor: COLORS.rrDim,
            borderWidth: 2.5,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#fff',
            pointBorderColor: COLORS.rr,
            pointBorderWidth: 2,
            fill: true,
          },
          {
            label: 'Cache-Aware (llm-d)',
            data: series.cache_aware.map(function (p) { return p.y; }),
            borderColor: COLORS.ca,
            backgroundColor: COLORS.caDim,
            borderWidth: 2.5,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#fff',
            pointBorderColor: COLORS.ca,
            pointBorderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        scales: baseScaleOptions('Conversation Turn', 'Mean TTFT (ms)'),
        plugins: {
          tooltip: {
            callbacks: {
              label: msTooltipLabel,
              afterBody: function (items) {
                if (items.length >= 2) {
                  var rr = items[0].parsed.y;
                  var ca = items[1].parsed.y;
                  return ((1 - ca / rr) * 100).toFixed(0) + '% TTFT reduction';
                }
                return '';
              },
            },
          },
        },
      },
    });
  }

  function buildWarmupChart(data) {
    var ctx = document.getElementById('chart-warmup');
    if (!ctx) return;
    var series = data.charts.warmup_curve.series;

    charts.warmup = new Chart(ctx, {
      type: 'line',
      data: {
        labels: series.round_robin.map(function (p) { return p.x; }),
        datasets: [
          {
            label: 'Round-Robin',
            data: series.round_robin.map(function (p) { return p.y; }),
            borderColor: COLORS.rr,
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointBackgroundColor: '#fff',
            pointBorderColor: COLORS.rr,
            pointBorderWidth: 2,
            tension: 0.2,
          },
          {
            label: 'Cache-Aware (llm-d)',
            data: series.cache_aware.map(function (p) { return p.y; }),
            borderColor: COLORS.ca,
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointBackgroundColor: '#fff',
            pointBorderColor: COLORS.ca,
            pointBorderWidth: 2,
            tension: 0.2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        scales: baseScaleOptions('Request Number', 'TTFT (ms)'),
        plugins: {
          tooltip: { callbacks: { label: msTooltipLabel } },
        },
      },
    });
  }

  function buildAgentic12Chart(data) {
    var ctx = document.getElementById('chart-agentic12');
    if (!ctx) return;
    var series = data.charts.agentic_chain_12step.series;

    charts.agentic12 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: series.round_robin.map(function (p) { return 'Step ' + p.x; }),
        datasets: [
          {
            label: 'Round-Robin',
            data: series.round_robin.map(function (p) { return p.y; }),
            borderColor: COLORS.rr,
            backgroundColor: COLORS.rrDim,
            borderWidth: 2.5,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#fff',
            pointBorderColor: COLORS.rr,
            pointBorderWidth: 2,
            tension: 0.3,
            fill: true,
          },
          {
            label: 'Cache-Aware (llm-d)',
            data: series.cache_aware.map(function (p) { return p.y; }),
            borderColor: COLORS.ca,
            backgroundColor: COLORS.caDim,
            borderWidth: 2.5,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#fff',
            pointBorderColor: COLORS.ca,
            pointBorderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        scales: baseScaleOptions('Agent Step', 'TTFT (ms)'),
        plugins: {
          tooltip: {
            callbacks: {
              label: msTooltipLabel,
              afterLabel: function (context) {
                var key = context.datasetIndex === 0 ? 'round_robin' : 'cache_aware';
                var dp = series[key][context.dataIndex];
                if (dp && dp.context_tokens) return 'Context: ' + dp.context_tokens.toLocaleString() + ' tokens';
                return '';
              },
            },
          },
        },
      },
    });
  }

  function buildAgentic8Chart(data) {
    var ctx = document.getElementById('chart-agentic8');
    if (!ctx) return;
    var series = data.charts.agentic_chain_8step_original.series;

    charts.agentic8 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: series.round_robin.map(function (p) { return 'Step ' + p.x; }),
        datasets: [
          {
            label: 'Round-Robin',
            data: series.round_robin.map(function (p) { return p.y; }),
            borderColor: COLORS.rr,
            backgroundColor: COLORS.rrDim,
            borderWidth: 2.5,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#fff',
            pointBorderColor: COLORS.rr,
            pointBorderWidth: 2,
            tension: 0.3,
            fill: true,
          },
          {
            label: 'Cache-Aware (llm-d)',
            data: series.cache_aware.map(function (p) { return p.y; }),
            borderColor: COLORS.ca,
            backgroundColor: COLORS.caDim,
            borderWidth: 2.5,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#fff',
            pointBorderColor: COLORS.ca,
            pointBorderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        scales: baseScaleOptions('Agent Step', 'TTFT (ms)'),
        plugins: {
          tooltip: {
            callbacks: {
              label: msTooltipLabel,
              afterLabel: function (context) {
                var key = context.datasetIndex === 0 ? 'round_robin' : 'cache_aware';
                var dp = series[key][context.dataIndex];
                if (dp && dp.context_tokens) return 'Context: ' + dp.context_tokens.toLocaleString() + ' tokens';
                return '';
              },
            },
          },
        },
      },
    });
  }

  function buildMultiturnChart(data) {
    var ctx = document.getElementById('chart-multiturn');
    if (!ctx) return;
    var series = data.charts.multi_turn_conversation.series;

    charts.multiturn = new Chart(ctx, {
      type: 'line',
      data: {
        labels: series.round_robin.map(function (p) { return 'Turn ' + p.x; }),
        datasets: [
          {
            label: 'Round-Robin',
            data: series.round_robin.map(function (p) { return p.y; }),
            borderColor: COLORS.rr,
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#fff',
            pointBorderColor: COLORS.rr,
            pointBorderWidth: 2,
            tension: 0.3,
          },
          {
            label: 'Cache-Aware (llm-d)',
            data: series.cache_aware.map(function (p) { return p.y; }),
            borderColor: COLORS.ca,
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#fff',
            pointBorderColor: COLORS.ca,
            pointBorderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        scales: baseScaleOptions('Conversation Turn', 'Median TTFT (ms)'),
        plugins: {
          tooltip: { callbacks: { label: msTooltipLabel } },
        },
      },
    });
  }

  function buildFleetChart(data) {
    var ctx = document.getElementById('chart-fleet');
    if (!ctx) return;
    var series = data.charts.fleet_warmup_projection.series;

    charts.fleet = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Round-Robin (32K ctx)',
            data: series.round_robin_32k.map(function (p) { return { x: p.x, y: p.y }; }),
            borderColor: COLORS.rr,
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#fff',
            pointBorderColor: COLORS.rr,
            pointBorderWidth: 2,
            tension: 0.3,
          },
          {
            label: 'Cache-Aware (32K ctx)',
            data: series.cache_aware_32k.map(function (p) { return { x: p.x, y: p.y }; }),
            borderColor: COLORS.ca,
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#fff',
            pointBorderColor: COLORS.ca,
            pointBorderWidth: 2,
            tension: 0.3,
          },
          {
            label: 'Round-Robin (8K ctx)',
            data: series.round_robin_8k.map(function (p) { return { x: p.x, y: p.y }; }),
            borderColor: COLORS.cold,
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: '#fff',
            pointBorderColor: COLORS.cold,
            pointBorderWidth: 2,
            tension: 0.3,
            borderDash: [6, 3],
          },
          {
            label: 'Cache-Aware (8K ctx)',
            data: series.cache_aware_8k.map(function (p) { return { x: p.x, y: p.y }; }),
            borderColor: COLORS.accent,
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: '#fff',
            pointBorderColor: COLORS.accent,
            pointBorderWidth: 2,
            tension: 0.3,
            borderDash: [6, 3],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        scales: baseScaleOptions('Number of Pods', 'Total Warmup Time (seconds)', { xType: 'linear' }),
        plugins: {
          tooltip: {
            callbacks: {
              title: function (items) { return items[0].parsed.x + ' pods'; },
              label: function (context) {
                return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + 's';
              },
            },
          },
        },
      },
    });
  }

  // ---- Build all charts ----
  function buildAllCharts(data) {
    buildScalingChart(data);
    buildSpeedupChart(data);
    buildConcurrentChart(data);
    buildWarmupChart(data);
    buildAgentic12Chart(data);
    buildAgentic8Chart(data);
    buildMultiturnChart(data);
    buildFleetChart(data);
  }

  // ---- Initialize ----
  function init() {
    initTabs();
    initScrollReveal();
    initHeroCounter();
    initScrollProgress();
    buildAllCharts(DATA);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
