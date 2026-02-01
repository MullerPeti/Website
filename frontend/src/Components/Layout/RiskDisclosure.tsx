import React from 'react';

const RiskDisclosure: React.FC = () => {
  return (
    <section className="border-t py-4 px-4 mt-8 transition-colors duration-200" style={{ marginTop: 'auto', width:'100%', bottom:0, backgroundColor: 'var(--color-background-secondary)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="border-l-4 p-4 rounded transition-colors duration-200 text-sm" style={{ backgroundColor: 'rgba(251, 191, 36, 0.05)', borderColor: 'var(--color-warning)' }}>
          <h3 className="font-bold mb-2" style={{ color: 'var(--color-warning)' }}>Risk Disclosure</h3>
          
          <div className="space-y-2" style={{ color: 'var(--color-text-primary)' }}>
            <p className="font-semibold text-xs">
              <strong>Risk Disclosure:</strong> Trading in derivative products such as CFDs, Forex, futures and options involves a high level of risk and may not be suitable for all investors. You can lose all of your invested capital, and in some cases losses may exceed your initial deposit. Only trade with money you can afford to lose without affecting your financial security or lifestyle. Automated or semi-automated trading tools are for support only and do not guarantee profits or prevent losses. Past performance is not a reliable indicator of future results.
           </p>
            
            <p className="text-xs">
              <strong>Disclaimer:</strong> The information provided is for educational purposes only and does not constitute financial advice. Consult with a qualified financial advisor before making any trading decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskDisclosure;
