import { jsPDF } from 'jspdf';
import { ActiveTripPlan, PlaceItinerary, CombinedPlanItinerary, PlanDayItinerary } from '../types';
import { resolvePlace } from './itineraryEngine';

/**
 * Format INR currency safely for standard PDF fonts (Helvetica)
 * Using "Rs." or "INR" avoids Unicode glyph missing issues in default PDF fonts.
 */
function formatCurrencyPDF(amount: number): string {
  return `Rs. ${Math.round(amount).toLocaleString('en-IN')}`;
}

export interface PDFExportOptions {
  mode: 'individual' | 'combined';
  placeId?: string; // If mode is individual, which place's itinerary to export
}

/**
 * Generates and downloads a clean, multi-page PDF itinerary using jsPDF.
 */
export function exportItineraryPDF(plan: ActiveTripPlan, options?: PDFExportOptions): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - (margin * 2);
  let y = margin;

  // Helper to check page overflow and add a new page
  const ensureSpace = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin - 12) {
      doc.addPage();
      y = margin;
      drawHeaderBanner(false);
    }
  };

  // Header Banner
  const drawHeaderBanner = (isFirstPage: boolean) => {
    // Top colored brand bar
    doc.setFillColor(15, 23, 42); // slate-900 / navy
    doc.rect(margin, y, contentWidth, isFirstPage ? 22 : 12, 'F');

    // Saffron accent stripe
    doc.setFillColor(249, 115, 22); // orange-500
    doc.rect(margin, y + (isFirstPage ? 22 : 12) - 1.5, contentWidth, 1.5, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(isFirstPage ? 14 : 10);
    doc.text('TRAVELWISE INDIA', margin + 6, y + (isFirstPage ? 10 : 8));

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(isFirstPage ? 8 : 7);
    doc.setTextColor(226, 232, 240);
    doc.text(
      isFirstPage ? 'Plan Smarter, Travel Beautifully — Verified Smart Itinerary' : 'TravelWise India — Smart Trip Plan',
      margin + 6,
      y + (isFirstPage ? 17 : 10)
    );

    y += (isFirstPage ? 26 : 16);
  };

  // Start with first page header
  drawHeaderBanner(true);

  // Determine export context: combined or specific individual place
  const isCombined = options?.mode === 'combined' || (!options?.placeId && plan.planningMode === 'combined');
  let singlePlaceItinerary: PlaceItinerary | undefined;
  let singleResolved = options?.placeId ? resolvePlace(options.placeId) : undefined;

  if (!isCombined) {
    const targetId = options?.placeId || plan.selectedPlaceIds[0];
    singlePlaceItinerary = plan.individualItineraries[targetId];
    singleResolved = resolvePlace(targetId);
  }

  // Document Title & Meta Box
  ensureSpace(40);
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(margin, y, contentWidth, 34, 3, 3, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);

  const mainTitle = isCombined
    ? `Combined Multi-Destination Trip Plan`
    : (singleResolved ? `${singleResolved.name} (${singleResolved.city}) Standalone Itinerary` : plan.title);
  
  doc.text(mainTitle, margin + 5, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105); // slate-600

  // 2-column trip meta
  const originStr = `Origin: ${plan.originCity.name}, ${plan.originCity.state}`;
  const datesStr = `Duration: ${plan.days} Days / ${plan.nights} Nights | Travel: ${plan.travelMonth} ${plan.travelYear}`;
  const groupStr = `Travelers: ${plan.groupType} (${plan.travelerCount} pax) | Stay: ${plan.accommodationType}`;
  const budgetStr = `Budget: ${formatCurrencyPDF(plan.budget)} (${plan.budgetScope === 'perPerson' ? 'Per Person' : 'Total Group'})`;

  doc.text(originStr, margin + 5, y + 15);
  doc.text(datesStr, margin + 5, y + 21);
  doc.text(groupStr, margin + 5, y + 27);
  doc.text(budgetStr, margin + contentWidth - 65, y + 15);

  const modeBadge = isCombined ? '[Mode: Unified Combined Circuit]' : '[Mode: Standalone Alternative Plan]';
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(234, 88, 12);
  doc.text(modeBadge, margin + contentWidth - 65, y + 21);

  y += 39;

  // Selected Places Overview (for combined or list)
  ensureSpace(25);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text(isCombined ? 'Included Places in Route Sequence:' : 'Selected Destination Focus:', margin, y);
  y += 5;

  const placesToRender = isCombined 
    ? (plan.combinedItinerary?.orderedPlaceIds || plan.selectedPlaceIds)
    : (options?.placeId ? [options.placeId] : plan.selectedPlaceIds);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  
  placesToRender.forEach((pId, idx) => {
    ensureSpace(8);
    const resolved = resolvePlace(pId);
    if (resolved) {
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin, y, contentWidth, 7, 1.5, 1.5, 'F');
      doc.setTextColor(30, 41, 59);
      doc.setFont('helvetica', 'bold');
      doc.text(`${idx + 1}. ${resolved.name}`, margin + 3, y + 4.8);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      const categoryTag = resolved.isExcursion ? `Excursion (~${resolved.curatedRoadDistanceKm || 100} km from ${resolved.city})` : `In-City Attraction (${resolved.city})`;
      doc.text(categoryTag, margin + 65, y + 4.8);
      
      doc.setTextColor(15, 118, 110);
      doc.text(`Entry: ${resolved.entryFee}`, margin + contentWidth - 45, y + 4.8);
      y += 8.5;
    }
  });

  y += 4;

  // Day-by-Day Itinerary Section
  ensureSpace(16);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Day-by-Day Schedule & Sightseeing', margin, y);
  y += 6;

  const daysList: PlanDayItinerary[] = isCombined 
    ? (plan.combinedItinerary?.days || [])
    : (singlePlaceItinerary?.days || []);

  if (daysList.length === 0) {
    ensureSpace(12);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text('No scheduled days available for this configuration.', margin, y);
    y += 10;
  } else {
    daysList.forEach((day) => {
      // Each day card has height depending on visits and transit
      const minCardHeight = 38 + (day.scheduledVisits.length * 10) + (day.travelSegments.length * 7);
      ensureSpace(Math.min(minCardHeight, 60));

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(203, 213, 225);
      doc.rect(margin, y, contentWidth, 7, 'F');
      
      // Day header banner
      doc.setFillColor(30, 41, 59);
      doc.rect(margin, y, contentWidth, 7, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text(`DAY ${day.dayNumber}: ${day.title.toUpperCase()}`, margin + 3, y + 4.8);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(226, 232, 240);
      doc.text(`Est. Day Expense: ${formatCurrencyPDF(day.dayTotalINR)}`, margin + contentWidth - 48, y + 4.8);
      y += 9;

      // Theme / Highlight
      if (day.highlight) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7.5);
        doc.setTextColor(71, 85, 105);
        doc.text(`Focus: ${day.highlight}`, margin + 2, y);
        y += 4.5;
      }

      // Scheduled Visits in this day
      day.scheduledVisits.forEach((visit) => {
        ensureSpace(12);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(15, 23, 42);
        doc.text(`[${visit.timeOfDay.toUpperCase()}] ${visit.placeName}`, margin + 3, y);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(71, 85, 105);
        const descText = doc.splitTextToSize(`${visit.activity} (Entry: ${visit.estimatedEntryFee})`, contentWidth - 8);
        doc.text(descText, margin + 3, y + 3.8);
        y += 5 + (descText.length * 3.2);
      });

      // Travel Segments if any
      if (day.travelSegments.length > 0) {
        day.travelSegments.forEach((seg) => {
          ensureSpace(9);
          doc.setFillColor(248, 250, 252);
          doc.rect(margin + 2, y, contentWidth - 4, 6, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7);
          doc.setTextColor(194, 65, 12);
          doc.text(`Transit Segment: ${seg.fromPlaceName} -> ${seg.toPlaceName} (${seg.transitMode}, ~${seg.estimatedDistanceKm} km, ~${seg.estimatedDuration} - ${formatCurrencyPDF(seg.estimatedTransitCostINR)})`, margin + 4, y + 4);
          y += 7.5;
        });
      }

      y += 4;
    });
  }

  // Cost Breakdown Section
  ensureSpace(42);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Estimated Budget & Cost Breakdown', margin, y);
  y += 6;

  const costBreakdown = isCombined 
    ? plan.combinedItinerary?.costBreakdown 
    : (singlePlaceItinerary?.costBreakdown || plan.combinedItinerary?.costBreakdown);

  const totalCost = isCombined
    ? (plan.combinedItinerary?.totalEstimatedCostINR || 0)
    : (singlePlaceItinerary?.totalEstimatedCostINR || 0);

  if (costBreakdown) {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);

    const colW = (contentWidth - 8) / 3;
    
    // Row 1
    doc.text(`Origin Transit: ${formatCurrencyPDF(costBreakdown.transportCost)}`, margin + 4, y + 6);
    doc.text(`Local Sightseeing: ${formatCurrencyPDF(costBreakdown.activitiesCost)}`, margin + 4 + colW, y + 6);
    doc.text(`Accommodations: ${formatCurrencyPDF(costBreakdown.accommodationCost)}`, margin + 4 + (colW * 2), y + 6);

    // Row 2
    doc.text(`Food & Meals: ${formatCurrencyPDF(costBreakdown.dailyExpenseCost)}`, margin + 4, y + 13);
    doc.text(`Activities & Entry: ${formatCurrencyPDF(costBreakdown.activitiesCost)}`, margin + 4 + colW, y + 13);
    doc.text(`Buffer / Incidentals: ${formatCurrencyPDF(costBreakdown.bufferAmount)}`, margin + 4 + (colW * 2), y + 13);

    // Row 3: Totals & Variance
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`Total Estimated Cost: ${formatCurrencyPDF(totalCost)}`, margin + 4, y + 21);

    const budgetDiff = plan.budget - totalCost;
    if (budgetDiff >= 0) {
      doc.setTextColor(22, 101, 52); // green-800
      doc.text(`Within Budget (Remaining: ${formatCurrencyPDF(budgetDiff)})`, margin + 4 + (colW * 1.5), y + 21);
    } else {
      doc.setTextColor(185, 28, 28); // red-700
      doc.text(`Exceeds Stated Budget by ${formatCurrencyPDF(Math.abs(budgetDiff))}`, margin + 4 + (colW * 1.5), y + 21);
    }

    y += 31;
  }

  // Feasibility & Pacing Advice (if any)
  const warnings = isCombined 
    ? (plan.combinedItinerary?.feasibilityWarnings || [])
    : (singlePlaceItinerary?.feasibilityWarnings || []);

  if (warnings.length > 0) {
    ensureSpace(20);
    doc.setFillColor(254, 242, 242); // red-50
    doc.setDrawColor(254, 202, 202);
    doc.roundedRect(margin, y, contentWidth, 6 + (warnings.length * 6), 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(185, 28, 28);
    doc.text('Trip Pacing & Feasibility Advisory:', margin + 4, y + 4.5);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    y += 6.5;
    warnings.forEach((warn) => {
      doc.text(`• ${warn}`, margin + 4, y);
      y += 5;
    });
    y += 3;
  }

  // Assumptions & Disclaimers
  ensureSpace(28);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Assumptions & Notes:', margin, y);
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);

  const notes = [
    `• All figures are realistic estimates in Indian Rupees (INR) calculated for ${plan.travelerCount} traveler(s).`,
    `• Transit times and road distances are based on regional road travel and may fluctuate with traffic, mountain passes, and train schedules.`,
    `• Accommodation rates reflect typical standard rates for ${plan.accommodationType} stays during ${plan.travelMonth}.`,
    `• Accommodations listed in TravelWise India are view-only recommendations for inspiration; verify live availability and book directly with certified vendors.`
  ];

  notes.forEach((n) => {
    ensureSpace(5);
    doc.text(n, margin, y);
    y += 3.8;
  });

  // Footer for each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    
    // Bottom rule
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);
    
    doc.text(
      `TravelWise India — Plan ID: ${plan.planId.slice(0, 12)} — Generated ${new Date().toLocaleDateString('en-IN')}`,
      margin,
      pageHeight - 6
    );
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth - margin - 16,
      pageHeight - 6
    );
  }

  // Save the PDF file
  const filename = isCombined
    ? `TravelWise_Combined_Plan_${plan.originCity.name}_${plan.travelMonth}.pdf`
    : `TravelWise_${(singleResolved?.name || 'Itinerary').replace(/[^a-zA-Z0-9]/g, '_')}_Plan.pdf`;

  doc.save(filename);
}
