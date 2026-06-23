/* ============================================
   llm-d Benchmark — Chart Rendering & Interactivity
   ============================================ */

(function () {
  'use strict';

  // ---- Color palette (matches CSS variables) ----
  const COLORS = {
    rr: '#f85149',
    rrDim: 'rgba(248, 81, 73, 0.15)',
    ca: '#3fb950',
    caDim: 'rgba(63, 185, 80, 0.15)',
    cold: '#f0883e',
    coldDim: 'rgba(240, 136, 62, 0.15)',
    accent: '#58a6ff',
    accentDim: 'rgba(88, 166, 255, 0.12)',
    textPrimary: '#e6edf3',
    textSecondary: '#8b949e',
    textMuted: '#6e7681',
    gridLine: 'rgba(48, 54, 61, 0.6)',
    surface: '#161b22',
  };

  // ---- Chart.js global defaults ----
  Chart.defaults.color = COLORS.textSecondary;
  Chart.defaults.borderColor = COLORS.gridLine;
  Chart.defaults.font.family =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif";
  Chart.defaults.font.size = 13;
  Chart.defaults.plugins.tooltip.backgroundColor = '#1c2128';
  Chart.defaults.plugins.tooltip.titleColor = COLORS.textPrimary;
  Chart.defaults.plugins.tooltip.bodyColor = COLORS.textSecondary;
  Chart.defaults.plugins.tooltip.borderColor = 'rgba(48, 54, 61, 0.8)';
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.cornerRadius = 8;
  Chart.defaults.plugins.tooltip.padding = 12;
  Chart.defaults.plugins.tooltip.displayColors = true;
  Chart.defaults.plugins.tooltip.boxPadding = 4;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.pointStyleWidth = 10;
  Chart.defaults.plugins.legend.labels.padding = 20;

  // ---- Shared chart option helpers ----
  function msTooltipLabel(context) {
    return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + ' ms';
  }

  function baseScaleOptions(xLabel, yLabel, opts) {
    var result = {
      x: {
        title: { display: true, text: xLabel, color: COLORS.textSecondary, font: { weight: 600 } },
        grid: { color: COLORS.gridLine, drawBorder: false },
        ticks: { color: COLORS.textSecondary },
      },
      y: {
        title: { display: true, text: yLabel, color: COLORS.textSecondary, font: { weight: 600 } },
        grid: { color: COLORS.gridLine, drawBorder: false },
        ticks: { color: COLORS.textSecondary },
        beginAtZero: true,
      },
    };
    if (opts && opts.xType) result.x.type = opts.xType;
    if (opts && opts.logY) {
      result.y.type = 'logarithmic';
    }
    return result;
  }

  // ---- Data (embedded from benchmark.json) ----
  var DATA = null;

  // ---- Chart instances ----
  var charts = {};

  // ---- Tab switching ----
  function initTabs() {
    var tabs = document.querySelectorAll('.chart-tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        // Deactivate all
        tabs.forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        document.querySelectorAll('.chart-panel').forEach(function (p) {
          p.classList.remove('active');
        });

        // Activate clicked
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        var chartKey = tab.getAttribute('data-chart');
        var panel = document.getElementById('panel-' + chartKey);
        if (panel) {
          panel.classList.add('active');
        }

        // Resize chart (Chart.js needs this after display change)
        if (charts[chartKey]) {
          charts[chartKey].resize();
        }
      });
    });
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
            pointHoverRadius: 7,
            pointBackgroundColor: COLORS.rr,
            tension: 0.3,
            fill: false,
          },
          {
            label: 'Cache Hit (cache-aware)',
            data: warmSeries.map(function (p) { return { x: p.x, y: p.y }; }),
            borderColor: COLORS.ca,
            backgroundColor: COLORS.caDim,
            borderWidth: 2.5,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: COLORS.ca,
            tension: 0.3,
            fill: false,
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
                  if (cold > 0 && warm > 0) {
                    return 'Speedup: ' + (cold / warm).toFixed(1) + 'x';
                  }
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
        datasets: [
          {
            label: 'Speedup Factor',
            data: bars.map(function (b) { return b.value; }),
            backgroundColor: bars.map(function (b) {
              // Gradient from accent to green based on value
              var ratio = b.value / 50;
              if (ratio > 1) ratio = 1;
              return 'rgba(63, 185, 80, ' + (0.4 + 0.5 * ratio) + ')';
            }),
            borderColor: COLORS.ca,
            borderWidth: 1,
            borderRadius: 4,
            barPercentage: 0.7,
          },
        ],
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
            pointHoverRadius: 7,
            pointBackgroundColor: COLORS.rr,
            fill: true,
          },
          {
            label: 'Cache-Aware (llm-d)',
            data: series.cache_aware.map(function (p) { return p.y; }),
            borderColor: COLORS.ca,
            backgroundColor: COLORS.caDim,
            borderWidth: 2.5,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: COLORS.ca,
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
                  var reduction = ((1 - ca / rr) * 100).toFixed(0);
                  return reduction + '% TTFT reduction';
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
            pointBackgroundColor: COLORS.rr,
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
            pointBackgroundColor: COLORS.ca,
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
          annotation: {
            annotations: {
              convergenceNote: {
                type: 'label',
                xValue: 4,
                yValue: 200,
                content: ['RR converges', 'after 3 cold starts'],
                color: COLORS.textMuted,
                font: { size: 11 },
              },
            },
          },
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
            pointBackgroundColor: COLORS.rr,
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
            pointBackgroundColor: COLORS.ca,
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
                var dataPoint = series[context.datasetIndex === 0 ? 'round_robin' : 'cache_aware'][context.dataIndex];
                if (dataPoint && dataPoint.context_tokens) {
                  return 'Context: ' + dataPoint.context_tokens.toLocaleString() + ' tokens';
                }
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
            pointHoverRadius: 7,
            pointBackgroundColor: COLORS.rr,
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
            pointHoverRadius: 7,
            pointBackgroundColor: COLORS.ca,
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
                var dataPoint = series[context.datasetIndex === 0 ? 'round_robin' : 'cache_aware'][context.dataIndex];
                if (dataPoint && dataPoint.context_tokens) {
                  return 'Context: ' + dataPoint.context_tokens.toLocaleString() + ' tokens';
                }
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
            pointBackgroundColor: COLORS.rr,
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
            pointBackgroundColor: COLORS.ca,
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
            pointHoverRadius: 7,
            pointBackgroundColor: COLORS.rr,
            tension: 0.3,
            borderDash: [],
          },
          {
            label: 'Cache-Aware (32K ctx)',
            data: series.cache_aware_32k.map(function (p) { return { x: p.x, y: p.y }; }),
            borderColor: COLORS.ca,
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: COLORS.ca,
            tension: 0.3,
            borderDash: [],
          },
          {
            label: 'Round-Robin (8K ctx)',
            data: series.round_robin_8k.map(function (p) { return { x: p.x, y: p.y }; }),
            borderColor: COLORS.cold,
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: COLORS.cold,
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
            pointBackgroundColor: COLORS.accent,
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

  // ---- Initialize ----
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

  function init() {
    initTabs();

    // Load data from benchmark.json
    fetch('data/benchmark.json')
      .then(function (response) {
        if (!response.ok) throw new Error('Failed to load benchmark data');
        return response.json();
      })
      .then(function (data) {
        DATA = data;
        buildAllCharts(data);
      })
      .catch(function (err) {
        console.error('Error loading benchmark data:', err);
        // Show error state in the first chart panel
        var panel = document.getElementById('panel-scaling');
        if (panel) {
          var msg = document.createElement('div');
          msg.style.cssText =
            'text-align:center;padding:3rem;color:#f85149;font-size:1rem;';
          msg.textContent =
            'Failed to load benchmark data. Make sure data/benchmark.json is available.';
          panel.querySelector('.chart-container').appendChild(msg);
        }
      });
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
