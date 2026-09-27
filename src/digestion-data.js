// Pharmaceutical Biochemistry: Digestion and Absorption
// Derived from the supplied 58-slide lecture by Ryan Christopher G. Atuel, RPh, MSc.
// Includes complete macronutrient hydrolysis, exact amino-acid cleavage residues,
// cellular energy / ATP links, fluid volume balance, iron reduction, and fiber physiology.

const section = (title, pages, summary, points, takeaway, table = null, figure = null) => ({ title, pages, summary, points, takeaway, table, figure });
const mc = (prompt, answer, wrong, explanation, page) => ({ type: 'mcq', prompt, answer, options: [answer, ...wrong], explanation, page });

const digestionLesson = {
  id: 1,
  subject: 'digestion',
  title: 'Digestion and absorption',
  sourceTitle: 'Pharmaceutical Biochemistry: Digestion',
  subtitle: 'Follow carbohydrates, lipids, and proteins from hydrolysis in the GI tract to absorption, transport, cellular ATP generation, and clinical maldigestion.',
  pages: 58,
  time: 45,
  instantFeedback: true,
  tags: ['Carbohydrates', 'Lipids', 'Proteins', 'Enzyme Specificity', 'Metabolism & ATP', 'GI Tract', 'Absorption', 'Clinical Biochemistry'],
  objectives: [
    'Trace carbohydrate, lipid, and protein digestion from the oral cavity through the small-intestinal brush border.',
    'Identify the exact amino-acid cleavage residues for each pancreatic endopeptidase and exopeptidase.',
    'Explain the metabolic fates of digested nutrients (glucose, glycerol, fatty acids, amino acids) and their entry into cellular respiration to generate ATP.',
    'Quantify daily GI fluid turnover (~2 gallons) and explain the physiological mechanisms of iron reduction, calcium uptake, and vitamin absorption.',
    'Describe the mechanical and biochemical functions of dietary fiber on intestinal muscularis tone, water retention, and cholesterol excretion.',
    'Compare the transport pathways of water-soluble nutrients through portal blood versus lipid packaging into chylomicrons and systemic lipoproteins.'
  ],
  sections: [
    section(
      '1. Digestion as selective hydrolysis',
      [2, 3],
      'Digestion is the enzyme-directed chemical breakdown of food macromolecules into units small enough for epithelial absorption. Hydrolysis is selective: each enzyme recognizes particular substrates, bond configurations, and linkage positions rather than attacking every nutrient indiscriminately.',
      [
        ['Carbohydrate endpoint', 'Dietary starches, glycogen, and sugars are reduced to the absorbable monosaccharides glucose, galactose, and fructose.'],
        ['Lipid endpoint', 'Triacylglycerols are mainly reduced to free fatty acids and 2-monoacylglycerol; other dietary lipids yield cholesterol, lysophospholipids, and fatty acids.'],
        ['Protein endpoint', 'Proteins are progressively cleaved into amino acids plus short dipeptides and tripeptides that intestinal cells can absorb.'],
        ['Mechanical plus chemical work', 'Chewing, gastric mixing, and intestinal peristalsis increase access, while enzymes and acid perform chemical transformation.'],
        ['Absorption is distinct from digestion', 'Digestion produces transportable, absorbable molecules; absorption moves those molecules across the intestinal epithelium into portal blood or the lymphatic system.']
      ],
      'Digestion makes absorbable units; absorption moves those units into the internal circulation.',
      {
        caption: 'Major nutrient classes, digestive strategies, and primary absorption routes',
        headers: ['Dietary component', 'Key digestive strategy', 'Principal absorbable products', 'Primary transport route'],
        rows: [
          ['Carbohydrates', 'Glycosidic-bond hydrolysis', 'Glucose, galactose, fructose', 'Portal blood to liver'],
          ['Proteins', 'Peptide-bond hydrolysis', 'Amino acids, dipeptides, tripeptides', 'Portal blood to liver'],
          ['Lipids', 'Emulsification plus ester-bond hydrolysis', 'Fatty acids, 2-monoacylglycerols, cholesterol', 'Lymph as chylomicrons, then systemic blood']
        ]
      }
    ),

    section(
      '2. Carbohydrate digestion: mouth to brush border',
      [4, 5, 6, 9, 11],
      'Carbohydrate digestion begins briefly in the mouth, pauses in the acidic stomach, resumes in the small-intestinal lumen, and finishes at the brush border. The pathway is staged so large polysaccharides become oligosaccharides first and monosaccharides last.',
      [
        ['Salivary alpha-amylase', 'Begins random cleavage of internal alpha(1->4) glycosidic bonds in starch and glycogen during mastication, producing maltose, maltotriose, and limit dextrins.'],
        ['Acid interruption in stomach', 'Low gastric pH (1.5-2.0) inactivates salivary amylase, pausing carbohydrate digestion until the chyme reaches the duodenum.'],
        ['Pancreatic alpha-amylase', 'After bicarbonate neutralizes gastric chyme in the duodenum, pancreatic amylase continues alpha(1->4) cleavage in the small-intestinal lumen.'],
        ['What amylase cannot cleave', 'Amylase cannot hydrolyze alpha(1->6) branch bonds or beta(1->4) cellulose bonds, leaving branched limit dextrins and indigestible dietary fiber.'],
        ['Brush-border disaccharidases', 'Enzymes embedded in the brush-border membrane complete hydrolysis: maltase-glucoamylase, sucrase-isomaltase, lactase, and trehalase.']
      ],
      'Amylases open alpha(1->4) chains; brush-border enzymes finish the job one disaccharide or branch bond at a time.',
      {
        caption: 'Brush-border disaccharidases, substrates, targeted bonds, and end products',
        headers: ['Enzyme', 'Substrate', 'Bond emphasized', 'Absorbable products'],
        rows: [
          ['Maltase', 'Maltose and maltotriose', 'alpha(1->4)', 'Glucose'],
          ['Isomaltase', 'Isomaltose and branch dextrins', 'alpha(1->6)', 'Glucose'],
          ['Sucrase', 'Sucrose', 'alpha(1->2)', 'Glucose + fructose'],
          ['Lactase', 'Lactose', 'beta(1->4)', 'Glucose + galactose'],
          ['Trehalase', 'Trehalose (from mushrooms/fungi)', 'alpha(1->1)', 'Two glucose molecules']
        ]
      }
    ),

    section(
      '3. Starch, glycogen, and fiber: linkage and physiology',
      [6, 7, 8, 9, 43, 47, 53],
      'Enzyme specificity explains why structurally similar glucose polymers behave differently in the gut. Human amylases recognize internal alpha(1->4) bonds but cannot cleave cellulose beta(1->4) bonds. Rather than being inert waste, undigested dietary fiber plays active mechanical and biochemical roles in gastrointestinal health.',
      [
        ['Amylose vs amylopectin', 'Amylose is predominantly linear with alpha(1->4) bonds; amylopectin is branched with both alpha(1->4) linear chains and alpha(1->6) branch points.'],
        ['Glycogen', 'The animal glucose storage polymer; highly branched, generating maltose, maltotriose, and isomaltose-containing dextrins during amylase digestion.'],
        ['Cellulose indigestibility', 'Cellulose is built from beta(1->4)-linked glucose units. Humans lack beta(1->4)-endoglucosidase, leaving cellulose completely resistant to human enzymatic hydrolysis.'],
        ['Muscularis stimulation & peristalsis', 'Undigested fiber forms a bulky semisolid mass that physically stimulates the muscular walls of the intestine, keeping the muscularis strong, toned, and capable of efficient peristalsis.'],
        ['Water retention & stool consistency', 'Fiber attracts and holds water in the luminal space, softening stool, increasing transit speed, and preventing constipation.'],
        ['Bile acid binding & cholesterol lowering', 'Dietary fiber physically binds bile acids, sterols, and dietary cholesterol in the lumen, escorting them out in feces. This forces the liver to synthesize fresh bile acids from circulating cholesterol, lowering serum cholesterol levels.'],
        ['Colonic microbial fermentation', 'Colonic bacteria ferment soluble fiber into short-chain fatty acids (SCFAs: acetate, propionate, butyrate) and gases (CO2, H2), nourishing colonocytes and acidifying the colonic environment.']
      ],
      'Fiber is physiologically active: it exercises the intestinal muscularis, binds bile acids to lower cholesterol, and retains water for smooth elimination.',
      {
        caption: 'Structural differences and physiological fates of dietary carbohydrates and fiber',
        headers: ['Carbohydrate type', 'Linkage configuration', 'Enzymatic digestion in humans', 'Key physiological outcome'],
        rows: [
          ['Starch (Amylose/Amylopectin)', 'alpha(1->4) and alpha(1->6)', 'Complete (Salivary + Pancreatic amylase + Isomaltase)', 'Hydrolyzed to glucose for cellular absorption'],
          ['Glycogen', 'alpha(1->4) and dense alpha(1->6)', 'Complete (Amylase + Brush border disaccharidases)', 'Rapidly converted to absorbable glucose'],
          ['Cellulose (Insoluble fiber)', 'beta(1->4) linear chains', 'None (humans lack beta(1->4)-endoglucosidase)', 'Adds bulk, tones intestinal muscle, and promotes peristalsis'],
          ['Soluble fiber (Pectins/Gums)', 'Varied non-starch polysaccharides', 'Fermented by colonic bacteria (not human enzymes)', 'Binds bile acids, lowers blood cholesterol, produces SCFAs']
        ]
      }
    ),

    section(
      '4. Monosaccharide absorption and carbohydrate intolerance',
      [10, 12, 13, 14],
      'Only monosaccharides cross the intestinal epithelium. The upper jejunum is the principal site of absorption, using distinct apical transporters and a shared basolateral exit. Failure to finish disaccharide digestion leaves osmotically active sugars that draw water and fuel bacterial fermentation.',
      [
        ['SGLT1 apical uptake', 'Sodium-glucose cotransporter 1 (SGLT1) couples the inward movement of sodium down its electrochemical gradient to transport glucose and galactose against their concentration gradients.'],
        ['GLUT5 facilitated diffusion', 'Fructose crosses the apical membrane independently of sodium via facilitated diffusion mediated by the GLUT5 uniporter.'],
        ['GLUT2 basolateral export', 'Glucose, galactose, and fructose all exit the enterocyte across the basolateral membrane into interstitial space and portal capillaries via GLUT2.'],
        ['Na+/K+-ATPase engine', 'The basolateral Na+/K+-ATPase pump actively expels 3 Na+ in exchange for 2 K+, maintaining the low intracellular sodium concentration that powers SGLT1.'],
        ['Lactose intolerance genetics & epidemiology', 'Caused by decreased lactase gene expression on chromosome 2. Affects >60% of adults globally, with prevalence up to 90% in populations of African and East Asian descent.'],
        ['Osmotic diarrhea & symptoms', 'Undigested disaccharides remain in the lumen, drawing water osmotically into the bowel. Colonic bacteria ferment the sugars into CO2, H2, and short-chain acids, causing bloating, flatulence, and watery cramps.'],
        ['Hydrogen breath test diagnosis', 'After an oral sugar challenge, bacterial fermentation releases hydrogen gas (H2), which enters the blood, diffuses into the lungs, and is quantified in exhaled breath.']
      ],
      'Transport is specific: glucose and galactose use SGLT1, fructose uses GLUT5, and all three leave through GLUT2 into portal blood.',
      {
        caption: 'Clinical comparison of common disaccharidase deficiencies',
        headers: ['Condition', 'Etiology & Genetics', 'Clinical manifestations', 'Diagnostic & management approach'],
        rows: [
          ['Primary lactose intolerance', 'Age-dependent decline in lactase expression (chromosome 2)', 'Bloating, flatulence, abdominal cramps, osmotic diarrhea after dairy', 'Hydrogen breath test; dietary restriction, lactase enzyme supplements'],
          ['Congenital sucrase-isomaltase deficiency (CSID)', 'Autosomal recessive mutation in SI gene (prevalence 1:5,000 Europe, 1:20 Inuit)', 'Severe watery diarrhea and failure to thrive upon introduction of sucrose and starch', 'Oral tolerance tests; restriction of sucrose and starch, sacrosidase enzyme therapy'],
          ['Acquired / Secondary disaccharidase deficiency', 'Mucosal damage from gastroenteritis, celiac disease, or severe malnutrition', 'Transient generalized carbohydrate malabsorption', 'Treat underlying mucosal disease; temporary lactose-free diet during mucosal repair']
        ]
      },
      {
        src: '/images/digestion/monosaccharide-absorption.png',
        alt: 'Lecture slide showing SGLT1, GLUT5, GLUT2, sodium gradients, and portal absorption of monosaccharides',
        caption: '<strong>Monosaccharide transport:</strong> sodium-coupled SGLT1 brings in glucose and galactose, GLUT5 brings in fructose, and GLUT2 provides basolateral exit to portal blood.'
      }
    ),

    section(
      '5. Lipid digestion begins with emulsification',
      [17, 19, 20, 48],
      'Lipids are hydrophobic and aggregate into large insoluble globules in an aqueous lumen. Digestion therefore requires both physical dispersion and enzymatic cleavage. Lingual and gastric lipases initiate digestion, but the duodenum is the major site of action.',
      [
        ['Dietary lipid intake', 'Average adult intake is ~78 g/day, comprising >90% triacylglycerols (TAGs), alongside cholesterol, cholesteryl esters, phospholipids, and free fatty acids.'],
        ['Lingual / salivary lipase', 'Secreted by sublingual salivary glands at the base of the tongue. It is acid-stable and splits one ester bond of triglycerides into diglycerides (DAG) and free fatty acids.'],
        ['Gastric lipase & satiety', 'Secreted by chief cells in the gastric mucosa; hydrolyzes ~10% of TAGs. High-fat meals delay gastric emptying, providing prolonged satiety.'],
        ['Duodenal emulsification', 'The breakdown of large fat droplets into micro-droplets in the duodenum, greatly multiplying the surface area for water-soluble lipases.'],
        ['Bile salts as natural detergents', 'Synthesized from cholesterol in the liver, conjugated with glycine or taurine, and stored in the gallbladder. Their amphipathic structure coats lipid droplets and prevents recoalescence.'],
        ['Mixed micelle formation', 'Bile salts assemble with fatty acids, 2-monoacylglycerols, cholesterol, and fat-soluble vitamins into tiny disc-like micelles that diffuse through the unstirred water layer to the brush border.']
      ],
      'Bile does not hydrolyze fat. It emulsifies fat to create the surface area required for pancreatic enzymes to operate.',
      {
        caption: 'Digestive sites, enzymes, and lipid breakdown products',
        headers: ['Anatomical site', 'Enzyme / Mechanism', 'Substrate & Action', 'Key products & Notes'],
        rows: [
          ['Mouth', 'Salivary / Lingual lipase (sublingual glands)', 'Acid-stable lipase mixes with food; minimal oral hydrolysis', 'Hard fats begin melting at body temperature'],
          ['Stomach', 'Gastric lipase + vigorous churning', 'Hydrolyzes ~10% of TAGs (especially short/medium-chain fats)', 'Diglycerides + free fatty acids; prolongs gastric satiety'],
          ['Duodenum', 'Bile salts (emulsification) + Peristalsis', 'Dispersion of large globules into stable micro-droplets', 'Emulsion droplets with high surface area for lipase access'],
          ['Small intestine lumen', 'Pancreatic lipase, Colipase, Cholesterol esterase, Phospholipase A2', 'Enzymatic cleavage of ester bonds at lipid-water interface', '2-monoacylglycerols, free fatty acids, free cholesterol, lysophospholipids in mixed micelles']
        ]
      }
    ),

    section(
      '6. Pancreatic lipid enzymes and hormonal control',
      [21, 22],
      'Pancreatic enzymes convert the major classes of dietary lipid into absorbable products. Their delivery is coordinated by CCK and secretin, linking nutrient composition and luminal acidity to gallbladder and pancreatic responses.',
      [
        ['Pancreatic lipase plus colipase', 'Hydrolyzes triacylglycerol at the 1 and 3 positions to yield 2-monoacylglycerol and two free fatty acids. Colipase anchors lipase at the bile-coated interface and is activated from procolipase by trypsin.'],
        ['Cholesterol esterase', 'Hydrolyzes dietary cholesteryl esters into free cholesterol and free fatty acids. Its activity is substantially stimulated by bile salts.'],
        ['Phospholipase A2', 'Activated from its zymogen by trypsin; removes the carbon-2 fatty acid from phospholipids to generate lysophospholipids and free fatty acids.'],
        ['Cholecystokinin (CCK) trigger', 'Released by duodenal I-cells in response to fatty acids and peptides; contracts the gallbladder to eject bile, stimulates pancreatic enzyme release, and slows gastric emptying.'],
        ['Secretin trigger', 'Released by duodenal S-cells in response to acidic chyme (low pH); stimulates pancreatic ductal bicarbonate secretion to establish a neutral/alkaline pH (7-8) optimal for enzyme function.'],
        ['Orlistat pharmacological connection', 'Orlistat is an anti-obesity drug that reversibly inhibits pancreatic lipase, preventing the hydrolysis and absorption of ~30% of dietary fat.']
      ],
      'CCK delivers bile and enzymes; secretin delivers bicarbonate; together they prepare the duodenum for lipid digestion.',
      {
        caption: 'Major enzymes of intestinal lipid digestion',
        headers: ['Substrate', 'Enzyme system', 'Major products', 'Activation or requirement'],
        rows: [
          ['Triacylglycerol (TAG)', 'Pancreatic lipase + colipase', '2-monoacylglycerol + 2 free fatty acids', 'Colipase activated by trypsin; inhibited by Orlistat'],
          ['Cholesteryl ester', 'Cholesterol esterase', 'Free cholesterol + free fatty acid', 'Activity strongly increased by bile salts'],
          ['Phospholipid', 'Phospholipase A2', 'Lysophospholipid + free fatty acid', 'Activated from zymogen by trypsin']
        ]
      },
      {
        src: '/images/digestion/lipid-enzymes.png',
        alt: 'Lecture table summarizing pancreatic lipid enzymes, products, and activation requirements',
        caption: '<strong>Lipid enzyme map:</strong> pancreatic lipase, cholesterol esterase, and phospholipase A2 target different ester bonds and generate distinct absorbable products.'
      }
    ),

    section(
      '7. Lipid absorption, re-esterification, and transport',
      [18, 55, 56],
      'After micellar delivery, lipid products enter intestinal cells and are rebuilt into complex lipids. Because large neutral lipids are insoluble in blood, enterocytes package them with phospholipids, cholesterol, and apoproteins before export.',
      [
        ['Re-esterification inside enterocytes', 'Free fatty acids and 2-monoacylglycerols are reassembled into triacylglycerols inside the smooth endoplasmic reticulum of enterocytes.'],
        ['Chylomicron packaging', 'Newly formed triacylglycerols combine with cholesterol, phospholipids, and apolipoprotein B-48 to assemble chylomicrons, the largest class of lipoproteins.'],
        ['Lymphatic transport route', 'Chylomicrons exit enterocytes by exocytosis and enter lymphatic lacteals, traveling through the cisterna chyli and thoracic duct to enter the left subclavian vein.'],
        ['Postprandial timeline', 'Chylomicron concentration in systemic blood begins rising shortly after a meal, peaking between 2 and 6 hours postprandially before clearing.'],
        ['Lipoprotein lipase (LPL) action', 'Endothelial capillary LPL hydrolyzes chylomicron TAG into free fatty acids (entering muscle for beta-oxidation or adipose tissue for storage) and glycerol (used for energy or gluconeogenesis in liver).'],
        ['VLDL to LDL cascade', 'The liver packages endogenous lipids into very-low-density lipoproteins (VLDL). As tissues extract TAG, particles transition into cholesterol-rich low-density lipoproteins (LDL) that supply peripheral tissues.'],
        ['High-density lipoprotein (HDL)', 'HDL mediates reverse cholesterol transport, picking up excess cholesterol from peripheral tissues and delivering it back to the liver for excretion in bile.']
      ],
      'Water-soluble nutrients enter portal blood directly; large dietary lipids require chylomicron packaging and a lymphatic detour.',
      {
        caption: 'Comparison of plasma lipoproteins in lipid transport',
        headers: ['Lipoprotein', 'Origin', 'Primary lipid payload', 'Major physiological role'],
        rows: [
          ['Chylomicrons', 'Intestinal enterocytes', 'Dietary triacylglycerols (>85%)', 'Deliver dietary fat to muscle and adipose; peak 2-6 hrs post-meal'],
          ['VLDL', 'Liver', 'Endogenous triacylglycerols (~55%)', 'Transport liver-synthesized fats to peripheral tissues'],
          ['LDL', 'VLDL catabolism in circulation', 'Cholesteryl esters and cholesterol (~50%)', 'Deliver cholesterol to peripheral tissue cells via LDL receptors'],
          ['HDL', 'Liver and intestine', 'Protein (~50%) and phospholipids', 'Reverse cholesterol transport: collects peripheral cholesterol and returns it to liver']
        ]
      }
    ),

    section(
      '8. Protein digestion in the stomach',
      [26, 27, 28, 38, 48, 51],
      'Protein digestion begins in the stomach because acid exposes peptide bonds and activates a protease. Gastric acid does not directly perform most peptide-bond hydrolysis; it creates the conditions that allow pepsin to act.',
      [
        ['Gastrin secretion', 'The peptide hormone gastrin is released by gastric G-cells in response to stomach distension and peptides, stimulating parietal and chief cells.'],
        ['Parietal cells & HCl secretion', 'Parietal cells secrete hydrochloric acid (HCl), lowering gastric pH to 1.5-2.0. HCl kills bacteria, denatures tertiary protein structures to expose peptide bonds, and activates pepsinogen.'],
        ['Reduction of dietary iron', 'Stomach acid (HCl) reduces dietary ferric iron (Fe3+) to ferrous iron (Fe2+), the soluble and absorbable form required for duodenal uptake via DMT1.'],
        ['Chief cells & pepsinogen', 'Chief cells synthesize and secrete pepsinogen, an inactive zymogen. Packaging as a zymogen prevents autodigestion of the secreting gastric chief cells.'],
        ['Pepsin endopeptidase activity', 'At pH < 2.0, pepsinogen undergoes autocatalytic cleavage to form active pepsin. Pepsin is an endopeptidase that hydrolyzes ~10% of peptide bonds into large polypeptides.'],
        ['Protective gastric mucus barrier', 'Surface mucous cells secrete a thick, slimy polysaccharide and glycoprotein mucus barrier that coats and shields the stomach lining from self-digestion by HCl and pepsin.'],
        ['Intrinsic factor secretion', 'Parietal cells concurrently secrete intrinsic factor (IF), a glycoprotein that binds vitamin B12 in the stomach/duodenum to protect it for later ileal absorption.']
      ],
      'HCl unfolds proteins, activates pepsinogen, and reduces Fe3+ to Fe2+; pepsin cleaves internal peptide bonds; mucus protects the stomach wall.',
      {
        caption: 'Gastric secretions, cellular origins, and primary physiological roles',
        headers: ['Secretory component', 'Cell of origin', 'Stimulus for secretion', 'Primary physiological action'],
        rows: [
          ['Hydrochloric acid (HCl)', 'Parietal cells', 'Gastrin, histamine, acetylcholine', 'Kills bacteria, denatures proteins, activates pepsinogen, reduces Fe3+ to Fe2+'],
          ['Pepsinogen (Zymogen)', 'Chief cells', 'Gastrin and vagal stimulation', 'Acid-cleaved into active pepsin; hydrolyzes internal peptide bonds'],
          ['Gastric mucus', 'Surface mucous cells', 'Mechanical and chemical irritation', 'Forms protective alkaline/viscous polysaccharide barrier preventing self-digestion'],
          ['Intrinsic factor (IF)', 'Parietal cells', 'Gastrin and vagal stimulation', 'Binds dietary vitamin B12 for specialized receptor-mediated uptake in the ileum']
        ]
      }
    ),

    section(
      '9. Pancreatic proteases and the zymogen cascade',
      [26, 29, 30, 40],
      'The small intestine completes protein digestion using a coordinated cascade of pancreatic zymogens and brush-border peptidases. Activation is localized to the intestinal lumen to protect pancreatic tissue from autodigestion.',
      [
        ['Bicarbonate neutralization', 'Secretin stimulates pancreatic duct cells to secrete bicarbonate (HCO3-), raising duodenal pH to 7-8 and providing the optimal alkaline environment for proteases.'],
        ['Enteropeptidase initiates cascade', 'Enteropeptidase (enterokinase), an enzyme bound to the duodenal brush border, cleaves a hexapeptide from trypsinogen to produce active trypsin.'],
        ['Trypsin as the master activator', 'Trypsin autocatalytically activates additional trypsinogen and activates chymotrypsinogen, proelastase, procarboxypeptidase A, procarboxypeptidase B, and procolipase.'],
        ['Trypsin cleavage specificity', 'A serine endopeptidase that cleaves internal peptide bonds specifically at the carbonyl group of basic amino acids: Arginine (Arg) and Lysine (Lys).'],
        ['Chymotrypsin cleavage specificity', 'A serine endopeptidase that cleaves internal peptide bonds at the carbonyl group of aromatic amino acids (Phenylalanine [Phe], Tyrosine [Tyr], Tryptophan [Trp]) and bulky hydrophobic residues (Leucine [Leu], Methionine [Met]).'],
        ['Elastase cleavage specificity', 'A serine endopeptidase that cleaves internal peptide bonds at the carbonyl group of small neutral aliphatic amino acids: Alanine (Ala), Glycine (Gly), and Serine (Ser).'],
        ['Carboxypeptidases A & B (Exopeptidases)', 'Zinc metallo-exopeptidases that cleave one amino acid at a time from the C-terminus: Carboxypeptidase A cleaves neutral, aliphatic, or aromatic residues; Carboxypeptidase B specifically cleaves basic residues (Arg, Lys).'],
        ['Brush-border and cytoplasmic peptidases', 'Aminopeptidases cleave from the N-terminus; dipeptidases and tripeptidases complete hydrolysis to free amino acids inside enterocyte cytoplasm.']
      ],
      'Enteropeptidase activates trypsin; trypsin activates all other pancreatic zymogens; each protease targets distinct amino-acid residues.',
      {
        caption: 'Pancreatic proteases, zymogens, activators, and exact residue cleavage specificities (Figure 19.5)',
        headers: ['Enzyme', 'Zymogen precursor', 'Activator', 'Classification', 'Targeted amino acid residue / bond'],
        rows: [
          ['Trypsin', 'Trypsinogen', 'Enteropeptidase, then Trypsin', 'Serine endopeptidase', 'Carbonyl group of basic amino acids: Arginine (Arg), Lysine (Lys)'],
          ['Chymotrypsin', 'Chymotrypsinogen', 'Trypsin', 'Serine endopeptidase', 'Carbonyl group of aromatic / bulky residues: Phe, Tyr, Trp, Leu, Met'],
          ['Elastase', 'Proelastase', 'Trypsin', 'Serine endopeptidase', 'Carbonyl group of small neutral residues: Alanine (Ala), Glycine (Gly), Serine (Ser)'],
          ['Carboxypeptidase A', 'Procarboxypeptidase A', 'Trypsin', 'Zinc exopeptidase (C-term)', 'Removes C-terminal neutral, aliphatic, or aromatic amino acids (Ala, Ile, Leu, Val, Phe)'],
          ['Carboxypeptidase B', 'Procarboxypeptidase B', 'Trypsin', 'Zinc exopeptidase (C-term)', 'Specifically removes C-terminal basic amino acids: Arginine (Arg), Lysine (Lys)']
        ]
      },
      {
        src: '/images/digestion/protease-cascade.png',
        alt: 'Lecture slide showing pancreatic endopeptidases, exopeptidases, zymogen activation, and peptide cleavage',
        caption: '<strong>Protease cascade:</strong> brush-border enteropeptidase activates trypsin, which activates the remaining pancreatic zymogens and drives staged peptide cleavage.'
      }
    ),

    section(
      '10. Cellular energy and metabolic fates of digested nutrients',
      [32, 33, 34],
      'The biological purpose of digestion is to supply cellular fuels and building blocks. Once absorbed, monosaccharides, fatty acids, glycerol, and amino acids enter specific biochemical pathways that converge on cellular respiration to generate ATP.',
      [
        ['Glucose and cellular respiration', 'Absorbed glucose enters cells via GLUT transporters and enters glycolysis in the cytoplasm, yielding 2 pyruvate, 2 ATP, and 2 NADH. Under aerobic conditions, pyruvate enters mitochondria, is converted to Acetyl-CoA, and enters the Krebs cycle and electron transport system to produce bulk ATP.'],
        ['Glycerol conversion to energy or glucose', 'Glycerol from triacylglycerol hydrolysis is phosphorylated to glycerol-3-phosphate and converted to dihydroxyacetone phosphate (DHAP), entering glycolysis for ATP generation or gluconeogenesis for glucose synthesis.'],
        ['Fatty acid beta-oxidation', 'Free fatty acids are activated and transported into mitochondria via the carnitine shuttle to undergo beta-oxidation, sequentially cleaving 2-carbon units into Acetyl-CoA while generating NADH and FADH2 for the electron transport chain.'],
        ['Primary fate of amino acids', 'Absorbed amino acids are primarily utilized by ribosomes to construct structural proteins, enzymes, transport proteins, and peptide hormones throughout the body.'],
        ['Fates of excess amino acids', 'Excess amino acids cannot be stored. Their amino groups are removed by transamination and deamination (forming urea in the liver), while their carbon skeletons are converted into pyruvate, Acetyl-CoA, or alpha-ketoglutarate, which enters the Krebs cycle.'],
        ['Convergence on the Krebs cycle', 'All three macronutrient classes converge on Acetyl-CoA and Krebs cycle intermediates, demonstrating that carbohydrate, lipid, and protein metabolism share a unified oxidative pathway for ATP production.']
      ],
      'Glucose drives glycolysis; fatty acids undergo beta-oxidation to Acetyl-CoA; excess amino acids form pyruvate, Acetyl-CoA, or alpha-ketoglutarate to fuel the Krebs cycle.',
      {
        caption: 'Metabolic entry points and energy conversion of digested macronutrients',
        headers: ['Digestion product', 'Primary cellular pathway', 'Metabolic intermediate formed', 'Ultimate cellular fate'],
        rows: [
          ['Glucose (Carbohydrate)', 'Glycolysis in cytoplasm', 'Pyruvate -> Acetyl-CoA', 'Krebs cycle and oxidative phosphorylation -> 30-32 ATP'],
          ['Glycerol (Lipid)', 'Glycerol kinase & DHAP conversion', 'Glyceraldehyde-3-phosphate / Pyruvate', 'Enters glycolysis for energy or gluconeogenesis for glucose'],
          ['Fatty acids (Lipid)', 'Mitochondrial beta-oxidation', 'Acetyl-CoA + NADH + FADH2', 'Feeds Krebs cycle and electron transport chain -> high-yield ATP'],
          ['Amino acids (Protein)', 'Deamination of excess amino acids', 'Pyruvate, Acetyl-CoA, alpha-ketoglutarate', 'Enters Krebs cycle for ATP production; nitrogen excreted as urea']
        ]
      }
    ),

    section(
      '11. Organ integration, GI fluid balance, and micronutrient transport',
      [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 49, 50, 52],
      'The GI tract operates as an integrated chemical assembly line with substantial fluid turnover. Over approximately 2 gallons of fluid are secreted daily, while specific anatomical checkpoints ensure the staged absorption of water, minerals, and vitamins.',
      [
        ['Massive fluid turnover (~2 gallons / day)', 'Approximately 7 to 9 liters (2 gallons) of digestive juices are secreted into the GI tract daily: saliva (~1.5 L), gastric juice (~2 L), bile (~1 L), pancreatic juice (~1.5 L), and intestinal secretions (~1.5 L).'],
        ['High-efficiency fluid reabsorption', 'More than 98% of secreted fluid is reabsorbed: ~7 liters in the small intestine and ~1.5 liters in the large intestine, leaving only ~100-200 mL excreted in normal stool.'],
        ['Iron reduction and absorption', 'Gastric HCl reduces ferric iron (Fe3+) to ferrous iron (Fe2+), the soluble form absorbed in the duodenum via the DMT1 transporter.'],
        ['Vitamin B12 and intrinsic factor', 'Dietary B12 binds gastric intrinsic factor (IF); the intact IF-B12 complex resists luminal proteolysis and is absorbed by receptor-mediated endocytosis in the terminal ileum.'],
        ['Fat-soluble vitamins (A, D, E, K)', 'Hydrophobic vitamins require bile salt emulsification and mixed micelle packaging for absorption, entering lymph via chylomicrons.'],
        ['Calcium absorption and vitamin D', 'Active calcium uptake in the duodenum and jejunum is stimulated by 1,25-dihydroxyvitamin D, which upregulates calbindin and calcium transport proteins.'],
        ['Bacterial vitamin synthesis in colon', 'Colonic microflora synthesize vitamin K and biotin (vitamin B7), which are absorbed across the large-intestinal mucosa.'],
        ['Hormonal integration (CCK, Secretin, Gastrin, GIP)', 'Gastrin triggers acid secretion; CCK triggers bile and enzyme delivery; Secretin triggers bicarbonate; GIP stimulates glucose-dependent insulin release from pancreatic beta-cells.']
      ],
      'The GI tract secretes ~2 gallons of fluid daily and reabsorbs >98%; HCl reduces Fe3+ to Fe2+; bile carries fat-soluble vitamins; IF carries B12.',
      {
        caption: 'Master summary of gastrointestinal hormones coordinating digestion',
        headers: ['Hormone', 'Production site', 'Stimulus for release', 'Primary target organ & physiological response'],
        rows: [
          ['Gastrin', 'Stomach (G-cells)', 'Peptides, amino acids, gastric distension, vagal nerve', 'Stimulates parietal cells to secrete HCl and chief cells to secrete pepsinogen'],
          ['Secretin', 'Duodenum (S-cells)', 'Acidic chyme (low pH < 4.5)', 'Stimulates pancreatic duct cells to secrete bicarbonate (HCO3-); neutralizes chyme'],
          ['Cholecystokinin (CCK)', 'Duodenum & Jejunum (I-cells)', 'Fatty acids, 2-MAG, peptides, amino acids', 'Contracts gallbladder (bile ejection), stimulates pancreatic enzyme secretion, slows gastric emptying'],
          ['GIP (Glucose-dependent insulinotropic peptide)', 'Duodenum & Jejunum (K-cells)', 'Glucose, fatty acids, amino acids', 'Stimulates insulin release from pancreatic beta cells; weakly inhibits gastric acid secretion']
        ]
      }
    ),

    section(
      '12. Absorptive architecture and clinical maldigestion syndromes',
      [10, 13, 14, 19, 29, 42, 49, 54],
      'Most absorption occurs in the small intestine because its surface area is amplified by folds, villi, and microvilli. Failure of any digestive secretion or mucosal structure causes predictable clinical maldigestion and malabsorption syndromes.',
      [
        ['Three levels of surface amplification', 'Circular folds (plicae circulares) amplify surface area by 3-fold; villi amplify it by 10-fold; microvilli (brush border) amplify it by 20-fold, creating a total absorptive surface of ~250-300 m2.'],
        ['Dual circulatory distribution routes', 'Water-soluble nutrients (monosaccharides, amino acids, water-soluble vitamins, short/medium-chain fatty acids) enter capillaries into portal blood. Hydrophobic lipids enter central lacteals into lymph.'],
        ['Lactose intolerance pathology', 'Lactase deficiency leaves undigested lactose in the colon, drawing water osmotically and producing bacterial fermentation with H2 gas, bloating, and cramps.'],
        ['Pancreatic insufficiency & steatorrhea', 'Deficiency of pancreatic lipase and proteases (from chronic pancreatitis or cystic fibrosis CFTR mutations) causes undigested fat in stool (steatorrhea) and deficiency of fat-soluble vitamins (A, D, E, K).'],
        ['Celiac disease villous atrophy', 'Immune-mediated enteropathy triggered by dietary gluten damages villi, causing blunting of microvilli, loss of brush-border enzymes, and generalized pan-malabsorption.'],
        ['Biliary obstruction consequences', 'Impaired bile delivery (gallstones, biliary strictures) prevents fat emulsification and micelle formation, causing clay-colored stools, steatorrhea, and malabsorption of fat-soluble vitamins.']
      ],
      'Surface area amplification drives absorption; loss of enzymes, bile, or villi produces distinct malabsorption syndromes.',
      {
        caption: 'Clinical maldigestion failure points and expected clinical consequences',
        headers: ['Failure point', 'Underlying disease / Cause', 'Immediate biochemical defect', 'Expected clinical consequence'],
        rows: [
          ['Lactase deficiency', 'Primary hypolactasia or mucosal injury', 'Lactose unabsorbed in jejunum', 'Osmotic diarrhea, flatulence, bloating, positive hydrogen breath test'],
          ['Pancreatic lipase deficiency', 'Chronic pancreatitis, Cystic Fibrosis', 'TAG ester bonds remain unhydrolyzed', 'Steatorrhea, weight loss, fat-soluble vitamin (A, D, E, K) deficiencies'],
          ['Biliary obstruction', 'Gallstones, biliary atresia, tumor', 'Absence of bile salts in duodenum', 'Failure of fat emulsification and micelle delivery; clay-colored stools'],
          ['Villous atrophy', 'Celiac disease (gluten enteropathy)', 'Loss of villi and brush border surface area', 'Severe pan-malabsorption, anemia, weight loss, chronic diarrhea'],
          ['Parietal cell loss', 'Autoimmune gastritis, gastrectomy', 'Lack of HCl and Intrinsic Factor', 'Impaired iron absorption (Fe3+ not reduced to Fe2+) and pernicious anemia (B12 deficiency)']
        ]
      },
      {
        src: '/images/digestion/villi-microvilli.png',
        alt: 'Lecture slide illustrating intestinal folds, villi, microvilli, capillaries, and a lymphatic lacteal',
        caption: '<strong>Absorptive architecture:</strong> folds, villi, and microvilli multiply surface area while paired capillary and lymphatic routes sort water-soluble nutrients from packaged lipids.'
      }
    )
  ],
  questions: [
    mc(
      'Which statement best defines digestion?',
      'Enzyme-directed chemical breakdown of large food molecules into smaller absorbable units',
      [
        'Passive movement of nutrients from blood into the intestinal lumen',
        'Mechanical storage of food without chemical change',
        'Conversion of all nutrients directly into ATP inside the stomach'
      ],
      'Digestion is primarily hydrolytic chemical breakdown; absorption is the later movement of products across the epithelium into blood or lymph.',
      2
    ),
    mc(
      'What are the three principal absorbable end products of carbohydrate digestion?',
      'Glucose, galactose, and fructose',
      [
        'Maltose, sucrose, and lactose',
        'Amylose, amylopectin, and glycogen',
        'Pyruvate, acetyl-CoA, and lactate'
      ],
      'Brush-border disaccharidases complete carbohydrate digestion to the monosaccharides glucose, galactose, and fructose.',
      4
    ),
    mc(
      'Which bond is hydrolyzed by salivary and pancreatic alpha-amylase?',
      'Internal alpha(1->4) glycosidic bonds',
      [
        'Alpha(1->6) branch bonds',
        'Beta(1->4) cellulose bonds',
        'Peptide bonds between amino acids'
      ],
      'Alpha-amylase is an endoglycosidase specific for internal alpha(1->4) linkages in starch and glycogen; it cannot cleave branch or beta linkages.',
      9
    ),
    mc(
      'Why does salivary amylase stop contributing substantially in the stomach?',
      'Gastric acid inactivates the enzyme',
      [
        'The stomach removes all starch by absorption',
        'Bile salts competitively inhibit the enzyme',
        'Pepsin permanently converts amylase into lactase'
      ],
      'The low gastric pH (1.5-2.0) inactivates salivary alpha-amylase, pausing carbohydrate digestion until the duodenum.',
      5
    ),
    mc(
      'Why can humans not enzymatically digest cellulose?',
      'Humans lack an enzyme that hydrolyzes beta(1->4) glucose linkages',
      [
        'Cellulose contains no glucose molecules',
        'Cellulose is absorbed intact in the stomach',
        'Pancreatic amylase only acts on proteins'
      ],
      'Cellulose contains beta(1->4) bonds, whereas human digestive amylases recognize only alpha(1->4) linkages.',
      7
    ),
    mc(
      'Which products are formed when pancreatic amylase acts on branched starch?',
      'Maltose, maltotriose, and isomaltose-containing limit dextrins',
      [
        'Only free fructose',
        'Amino acids and dipeptides',
        'Cholesterol and free fatty acids'
      ],
      'Pancreatic amylase cleaves internal alpha(1->4) bonds but cannot cleave alpha(1->6) branch points, leaving limit dextrins for brush-border isomaltase.',
      9
    ),
    mc(
      'What products result from lactase action on lactose?',
      'Glucose and galactose',
      [
        'Glucose and fructose',
        'Two glucose molecules',
        'Galactose and fructose'
      ],
      'Lactase hydrolyzes the beta(1->4) bond in lactose to yield glucose and galactose.',
      11
    ),
    mc(
      'Which transporter brings glucose and galactose into enterocytes from the intestinal lumen?',
      'SGLT1',
      [
        'GLUT5',
        'GLUT2',
        'Lipoprotein lipase'
      ],
      'SGLT1 uses the sodium electrochemical gradient to cotransport glucose and galactose across the apical membrane.',
      12
    ),
    mc(
      'Which transporter is responsible for apical fructose uptake?',
      'GLUT5',
      [
        'SGLT1',
        'GLUT2',
        'Na+/K+-ATPase'
      ],
      'Fructose enters enterocytes across the apical brush-border membrane mainly through GLUT5 via facilitated diffusion.',
      12
    ),
    mc(
      'Why does disaccharidase deficiency commonly cause osmotic diarrhea and bloating?',
      'Undigested carbohydrate retains water and is fermented by colonic bacteria',
      [
        'Excess pepsin enters the colon and digests mucus',
        'All monosaccharides are secreted back into the stomach',
        'Bile salts block water absorption in the esophagus'
      ],
      'Luminal carbohydrates are osmotically active and bacterial fermentation generates gases (CO2, H2) and organic acids.',
      13
    ),
    mc(
      'What does an increased hydrogen breath test after an oral sugar challenge indicate?',
      'Poor carbohydrate absorption with bacterial fermentation',
      [
        'Excess gastric protein digestion',
        'Complete lipid absorption in the duodenum',
        'Increased hepatic bile synthesis'
      ],
      'Poorly absorbed carbohydrates reach colonic bacteria, which generate hydrogen gas that is absorbed and exhaled in breath.',
      14
    ),
    mc(
      'What is the principal digestive role of bile salts?',
      'Emulsify dietary fat and support mixed micelle formation',
      [
        'Hydrolyze peptide bonds directly',
        'Activate pepsinogen in the stomach',
        'Transport glucose through SGLT1'
      ],
      'Bile salts are amphipathic emulsifiers derived from cholesterol; they disperse fat droplets and carry lipid products in micelles.',
      20
    ),
    mc(
      'What are the main products of pancreatic lipase acting on triacylglycerol?',
      '2-monoacylglycerol and free fatty acids',
      [
        'Three amino acids and glycerol',
        'Glucose and galactose',
        'Cholesterol and phosphatidylcholine only'
      ],
      'Pancreatic lipase cleaves the 1 and 3 ester bonds of TAG, leaving 2-monoacylglycerol plus two free fatty acids.',
      21
    ),
    mc(
      'What is the function of colipase during lipid digestion?',
      'Anchors pancreatic lipase at the bile-coated lipid-water interface',
      [
        'Converts fructose to glucose',
        'Denatures protein in the stomach',
        'Carries chylomicrons through portal blood'
      ],
      'Colipase stabilizes and anchors lipase at the fat droplet surface and is activated from procolipase by trypsin.',
      21
    ),
    mc(
      'Which physiological response is produced by cholecystokinin (CCK)?',
      'Gallbladder contraction, pancreatic enzyme secretion, and slower gastric emptying',
      [
        'Inhibition of bile release and faster gastric emptying',
        'Direct activation of pepsinogen in the stomach lumen',
        'Increased SGLT1 synthesis in the colon'
      ],
      'CCK is released in response to lipids and peptides; it coordinates delivery of bile and pancreatic enzymes while slowing gastric emptying.',
      22
    ),
    mc(
      'What is the key digestive action of secretin?',
      'Stimulates pancreatic bicarbonate secretion in response to acidic chyme',
      [
        'Stimulates salivary amylase release in response to glucose',
        'Directly hydrolyzes dietary fat',
        'Converts trypsin to trypsinogen'
      ],
      'Secretin promotes bicarbonate-rich pancreatic fluid, neutralizing duodenal acid so pancreatic enzymes can function optimally at pH 7-8.',
      22
    ),
    mc(
      'When do newly formed chylomicrons reach peak concentration in systemic blood?',
      '2 to 6 hours after a meal',
      [
        'Within 5 to 10 minutes after swallowing',
        '18 to 24 hours after a meal',
        'Continuously at a constant baseline rate'
      ],
      'Chylomicrons enter lymphatic lacteals, pass through the thoracic duct, and peak in systemic circulation between 2 and 6 hours postprandially.',
      18
    ),
    mc(
      'How does gastric hydrochloric acid (HCl) assist in dietary iron absorption?',
      'It reduces ferric iron (Fe3+) to soluble and absorbable ferrous iron (Fe2+)',
      [
        'It oxidizes ferrous iron into insoluble ferritin complexes',
        'It converts iron directly into hemoglobin inside the stomach',
        'It binds iron to intrinsic factor for ileal transport'
      ],
      'Stomach acid maintains an acidic pH that reduces dietary ferric iron (Fe3+) into ferrous iron (Fe2+), which is transported via DMT1.',
      49
    ),
    mc(
      'What protects the stomach lining from self-digestion by hydrochloric acid and pepsin?',
      'A thick, slimy polysaccharide and glycoprotein mucus barrier',
      [
        'A high concentration of pancreatic bicarbonate secreted by chief cells',
        'Continuous secretion of bile salts along the gastric rugae',
        'Rapid absorption of all acid directly into gastric lymphatics'
      ],
      'Surface mucous cells secrete a thick mucus barrier containing polysaccharides and bicarbonate that shields the gastric epithelium.',
      51
    ),
    mc(
      'Which specific amino-acid residues are cleaved at the carboxyl end by pancreatic trypsin?',
      'Basic amino acids: Arginine (Arg) and Lysine (Lys)',
      [
        'Aromatic amino acids: Phenylalanine, Tyrosine, and Tryptophan',
        'Small neutral amino acids: Alanine, Glycine, and Serine',
        'Acidic amino acids: Aspartate and Glutamate'
      ],
      'Trypsin is a serine endopeptidase that cleaves peptide bonds specifically at the carbonyl end of basic residues (Arg, Lys).',
      30
    ),
    mc(
      'Which specific amino-acid residues are cleaved at the carboxyl end by pancreatic chymotrypsin?',
      'Aromatic and bulky hydrophobic residues (Phe, Tyr, Trp, Leu, Met)',
      [
        'Basic residues (Arginine and Lysine)',
        'Small neutral residues (Alanine and Glycine)',
        'C-terminal basic amino acids only'
      ],
      'Chymotrypsin is specific for peptide bonds containing aromatic amino acids (Phe, Tyr, Trp) and bulky hydrophobic residues (Leu, Met).',
      30
    ),
    mc(
      'Which specific amino-acid residues are cleaved by pancreatic elastase?',
      'Small neutral aliphatic amino acids: Alanine (Ala), Glycine (Gly), and Serine (Ser)',
      [
        'Basic residues: Arginine and Lysine',
        'Aromatic residues: Phenylalanine and Tryptophan',
        'Acidic residues: Aspartate and Glutamate'
      ],
      'Elastase cleaves internal peptide bonds specifically at the carboxyl group of small neutral amino acids like Ala, Gly, and Ser.',
      30
    ),
    mc(
      'What metabolic intermediates are formed from the carbon skeletons of excess amino acids to enter the Krebs cycle?',
      'Pyruvate, Acetyl-CoA, and alpha-ketoglutarate',
      [
        'Cellulose, glycogen, and starch',
        'Chylomicrons, VLDL, and LDL',
        'Bilirubin, bile salts, and cholesterol'
      ],
      'Excess amino acids are deaminated; their carbon skeletons form pyruvate, Acetyl-CoA, or Krebs cycle intermediates like alpha-ketoglutarate to produce ATP.',
      32
    ),
    mc(
      'Approximately how much fluid does the GI tract secrete daily, and how much is reabsorbed?',
      '~2 gallons (7 to 9 liters) secreted daily, with over 98% reabsorbed',
      [
        '~500 mL secreted daily, with 10% reabsorbed',
        '~15 gallons secreted daily, with 50% excreted in feces',
        '~1 liter secreted daily, with zero reabsorption'
      ],
      'The GI tract secretes ~2 gallons (7-9 L) of fluid daily from various glands; the small and large intestines reabsorb >98%, leaving ~100-200 mL in stool.',
      49
    ),
    mc(
      'How does dietary fiber contribute to intestinal muscular health and cholesterol management?',
      'It stimulates muscularis tone for efficient peristalsis and binds bile acids/cholesterol for fecal excretion',
      [
        'It is hydrolyzed into glucose for direct ATP synthesis in enterocytes',
        'It neutralizes gastric acid in place of pancreatic bicarbonate',
        'It converts LDL into chylomicrons inside the colonic lumen'
      ],
      'Fiber provides physical bulk that stimulates peristaltic muscular tone, retains water, and binds bile acids and cholesterol, promoting their elimination.',
      53
    )
  ]
};

digestionLesson.questions.forEach((question, index) => {
  question.id = `digestion-1-q${index + 1}`;
});
digestionLesson.cards = digestionLesson.questions.map(question => ({
  id: question.id,
  front: question.prompt,
  back: question.answer,
  detail: question.explanation,
  page: question.page
}));

export const digestionLessons = [digestionLesson];
