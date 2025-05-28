export const trackServiceClick = (service: string, amount: number, fromCountry: string, toCountry: string) => {
  // @ts-ignore
  if (typeof gtag !== 'undefined') {
    // @ts-ignore
    gtag('event', 'service_click', {
      service_name: service,
      transfer_amount: amount,
      from_country: fromCountry,
      to_country: toCountry,
      event_category: 'engagement',
      event_label: `${service}-${fromCountry}-${toCountry}`
    });
    console.log(`🎯 CLIC TRACKÉ: ${service} - ${amount}€ de ${fromCountry} vers ${toCountry}`);
  }
};

export const trackComparison = (fromCountry: string, toCountry: string, amount: number) => {
  // @ts-ignore
  if (typeof gtag !== 'undefined') {
    // @ts-ignore
    gtag('event', 'comparison_search', {
      from_country: fromCountry,
      to_country: toCountry,
      amount: amount,
      event_category: 'conversion'
    });
  }
};

export const trackPageEngagement = (pageName: string) => {
  // @ts-ignore
  if (typeof gtag !== 'undefined') {
    // @ts-ignore
    gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      event_category: 'engagement'
    });
  }
};