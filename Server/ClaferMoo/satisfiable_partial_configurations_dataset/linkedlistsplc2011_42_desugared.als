/*
All clafers: 24 | Abstract: 2 | Concrete: 22 | References: 0
Constraints: 22
Goals: 1
Global scope: 1..*
All names unique: False
*/
open util/integer
pred show {}


abstract sig c1_IMeasurable
{ r_c2_footprint : one c2_footprint }

sig c2_footprint
{ c2_footprint_ref : one Int }
{ one @r_c2_footprint.this }

abstract sig c3_LinkedList
{ r_c4_AbstractElement : one c4_AbstractElement
, r_c29_AbstractIterator : one c29_AbstractIterator
, r_c47_AbstractSort : lone c47_AbstractSort
, r_c77_print : lone c77_print
, r_c83_Measurement : lone c83_Measurement
, r_c115_Base : one c115_Base
, r_c121_total_footprint : one c121_total_footprint }

sig c4_AbstractElement extends c1_IMeasurable
{ r_c11_ElementA : lone c11_ElementA
, r_c17_ElementB : lone c17_ElementB
, r_c23_ElementC : lone c23_ElementC }
{ one @r_c4_AbstractElement.this
  let children = (r_c11_ElementA + r_c17_ElementB + r_c23_ElementC) | one children
  (this.@r_c2_footprint.@c2_footprint_ref) = (-12) }

sig c11_ElementA extends c1_IMeasurable
{}
{ one @r_c11_ElementA.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 12 }

sig c17_ElementB extends c1_IMeasurable
{}
{ one @r_c17_ElementB.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c23_ElementC extends c1_IMeasurable
{}
{ one @r_c23_ElementC.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c29_AbstractIterator extends c1_IMeasurable
{ r_c35_ForwardIterator : lone c35_ForwardIterator
, r_c41_BackwardIterator : lone c41_BackwardIterator }
{ one @r_c29_AbstractIterator.this
  let children = (r_c35_ForwardIterator + r_c41_BackwardIterator) | one children
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c35_ForwardIterator extends c1_IMeasurable
{}
{ one @r_c35_ForwardIterator.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c41_BackwardIterator extends c1_IMeasurable
{}
{ one @r_c41_BackwardIterator.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 1 }

sig c47_AbstractSort extends c1_IMeasurable
{ r_c53_BubbleSort : lone c53_BubbleSort
, r_c59_MergeSort : lone c59_MergeSort
, r_c65_InsertionSort : lone c65_InsertionSort
, r_c71_QuickSort : lone c71_QuickSort }
{ one @r_c47_AbstractSort.this
  let children = (r_c53_BubbleSort + r_c59_MergeSort + r_c65_InsertionSort + r_c71_QuickSort) | one children
  (this.@r_c2_footprint.@c2_footprint_ref) = 57 }

sig c53_BubbleSort extends c1_IMeasurable
{}
{ one @r_c53_BubbleSort.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 17 }

sig c59_MergeSort extends c1_IMeasurable
{}
{ one @r_c59_MergeSort.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 32 }

sig c65_InsertionSort extends c1_IMeasurable
{}
{ one @r_c65_InsertionSort.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c71_QuickSort extends c1_IMeasurable
{}
{ one @r_c71_QuickSort.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 22 }

sig c77_print extends c1_IMeasurable
{}
{ one @r_c77_print.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 44 }

sig c83_Measurement extends c1_IMeasurable
{ r_c91_TCP_IP : one c91_TCP_IP
, r_c97_SyntheticPerformanceOrMemorySize : one c97_SyntheticPerformanceOrMemorySize }
{ one @r_c83_Measurement.this
  some (this.~@r_c83_Measurement).@r_c47_AbstractSort
  (this.@r_c2_footprint.@c2_footprint_ref) = 484 }

sig c91_TCP_IP extends c1_IMeasurable
{}
{ one @r_c91_TCP_IP.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c97_SyntheticPerformanceOrMemorySize extends c1_IMeasurable
{ r_c103_Performance : lone c103_Performance
, r_c109_MemorySize : lone c109_MemorySize }
{ one @r_c97_SyntheticPerformanceOrMemorySize.this
  let children = (r_c103_Performance + r_c109_MemorySize) | some children
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c103_Performance extends c1_IMeasurable
{}
{ one @r_c103_Performance.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 37 }

sig c109_MemorySize extends c1_IMeasurable
{}
{ one @r_c109_MemorySize.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 36 }

sig c115_Base extends c1_IMeasurable
{}
{ one @r_c115_Base.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 455 }

sig c121_total_footprint
{ c121_total_footprint_ref : one Int }
{ one @r_c121_total_footprint.this
  this.@c121_total_footprint_ref = (((((((((((((((((((((this.~@r_c121_total_footprint).@r_c4_AbstractElement).@r_c2_footprint.@c2_footprint_ref).add[((((this.~@r_c121_total_footprint).@r_c4_AbstractElement).@r_c11_ElementA).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c121_total_footprint).@r_c4_AbstractElement).@r_c17_ElementB).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c121_total_footprint).@r_c4_AbstractElement).@r_c23_ElementC).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c121_total_footprint).@r_c29_AbstractIterator).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c121_total_footprint).@r_c29_AbstractIterator).@r_c35_ForwardIterator).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c121_total_footprint).@r_c29_AbstractIterator).@r_c41_BackwardIterator).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c121_total_footprint).@r_c47_AbstractSort).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c121_total_footprint).@r_c47_AbstractSort).@r_c53_BubbleSort).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c121_total_footprint).@r_c47_AbstractSort).@r_c59_MergeSort).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c121_total_footprint).@r_c47_AbstractSort).@r_c65_InsertionSort).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c121_total_footprint).@r_c47_AbstractSort).@r_c71_QuickSort).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c121_total_footprint).@r_c77_print).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c121_total_footprint).@r_c83_Measurement).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c121_total_footprint).@r_c83_Measurement).@r_c91_TCP_IP).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c121_total_footprint).@r_c83_Measurement).@r_c97_SyntheticPerformanceOrMemorySize).@r_c2_footprint.@c2_footprint_ref)]).add[(((((this.~@r_c121_total_footprint).@r_c83_Measurement).@r_c97_SyntheticPerformanceOrMemorySize).@r_c103_Performance).@r_c2_footprint.@c2_footprint_ref)]).add[(((((this.~@r_c121_total_footprint).@r_c83_Measurement).@r_c97_SyntheticPerformanceOrMemorySize).@r_c109_MemorySize).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c121_total_footprint).@r_c115_Base).@r_c2_footprint.@c2_footprint_ref)]) }

one sig c199_simpleConfig extends c3_LinkedList
{}
{ ((((((((((some this.@r_c4_AbstractElement) && (no (this.@r_c4_AbstractElement).@r_c11_ElementA)) && (some this.@r_c29_AbstractIterator)) && (some (this.@r_c29_AbstractIterator).@r_c41_BackwardIterator)) && (some this.@r_c47_AbstractSort)) && (some (this.@r_c47_AbstractSort).@r_c59_MergeSort)) && (no (this.@r_c47_AbstractSort).@r_c71_QuickSort)) && (some this.@r_c77_print)) && (some (this.@r_c83_Measurement).@r_c97_SyntheticPerformanceOrMemorySize)) && (some ((this.@r_c83_Measurement).@r_c97_SyntheticPerformanceOrMemorySize).@r_c103_Performance)) && (no ((this.@r_c83_Measurement).@r_c97_SyntheticPerformanceOrMemorySize).@r_c109_MemorySize) }

objectives o_global {
minimize c199_simpleConfig.@r_c121_total_footprint.@c121_total_footprint_ref 
}sig bag_extra_ints{
  extra_ints : set Int
}
inst partial_speedup {
    1
    ,bag_extra_ints = concrete_int_bag
    , extra_ints = concrete_int_bag -> 5  + concrete_int_bag -> 6  + concrete_int_bag -> 10  + concrete_int_bag -> 11  + concrete_int_bag -> 13  + concrete_int_bag -> 18  + concrete_int_bag -> 20  + concrete_int_bag -> 21  + concrete_int_bag -> 23  + concrete_int_bag -> 24  + concrete_int_bag -> 25  + concrete_int_bag -> 26  + concrete_int_bag -> 27  + concrete_int_bag -> 28  + concrete_int_bag -> 29  + concrete_int_bag -> 30  + concrete_int_bag -> 33  + concrete_int_bag -> 34  + concrete_int_bag -> 35  + concrete_int_bag -> 38  + concrete_int_bag -> 39  + concrete_int_bag -> 40  + concrete_int_bag -> 41  + concrete_int_bag -> 42  + concrete_int_bag -> 43  + concrete_int_bag -> 45  + concrete_int_bag -> 46  + concrete_int_bag -> 47  + concrete_int_bag -> 48  + concrete_int_bag -> 49  + concrete_int_bag -> 50  + concrete_int_bag -> 51  + concrete_int_bag -> 52  + concrete_int_bag -> 53  + concrete_int_bag -> 54  + concrete_int_bag -> 55  + concrete_int_bag -> 56  + concrete_int_bag -> 58  + concrete_int_bag -> 59  + concrete_int_bag -> 60  + concrete_int_bag -> 61  + concrete_int_bag -> 62  + concrete_int_bag -> 63  + concrete_int_bag -> 64  + concrete_int_bag -> 65  + concrete_int_bag -> 66  + concrete_int_bag -> 67  + concrete_int_bag -> 68  + concrete_int_bag -> 69  + concrete_int_bag -> 70  + concrete_int_bag -> 71  + concrete_int_bag -> 72  + concrete_int_bag -> 73  + concrete_int_bag -> 74  + concrete_int_bag -> 75  + concrete_int_bag -> 76  + concrete_int_bag -> 77  + concrete_int_bag -> 78  + concrete_int_bag -> 79  + concrete_int_bag -> 80  + concrete_int_bag -> 81  + concrete_int_bag -> 82  + concrete_int_bag -> 83  + concrete_int_bag -> 84  + concrete_int_bag -> 85  + concrete_int_bag -> 86  + concrete_int_bag -> 87  + concrete_int_bag -> 88  + concrete_int_bag -> 89  + concrete_int_bag -> 90  + concrete_int_bag -> 91  + concrete_int_bag -> 92  + concrete_int_bag -> 93  + concrete_int_bag -> 94  + concrete_int_bag -> 95  + concrete_int_bag -> 96  + concrete_int_bag -> 97  + concrete_int_bag -> 98  + concrete_int_bag -> 99  + concrete_int_bag -> 100  + concrete_int_bag -> 101  + concrete_int_bag -> 102  + concrete_int_bag -> 103  + concrete_int_bag -> 104  + concrete_int_bag -> 105  + concrete_int_bag -> 106  + concrete_int_bag -> 107  + concrete_int_bag -> 108  + concrete_int_bag -> 109  + concrete_int_bag -> 110  + concrete_int_bag -> 111  + concrete_int_bag -> 112  + concrete_int_bag -> 113  + concrete_int_bag -> 114  + concrete_int_bag -> 115  + concrete_int_bag -> 116  + concrete_int_bag -> 117  + concrete_int_bag -> 118  + concrete_int_bag -> 119  + concrete_int_bag -> 120  + concrete_int_bag -> 121  + concrete_int_bag -> 122  + concrete_int_bag -> 123  + concrete_int_bag -> 124  + concrete_int_bag -> 125  + concrete_int_bag -> 126  + concrete_int_bag -> 127  + concrete_int_bag -> 128  + concrete_int_bag -> 129  + concrete_int_bag -> 130  + concrete_int_bag -> 131  + concrete_int_bag -> 132  + concrete_int_bag -> 133  + concrete_int_bag -> 134  + concrete_int_bag -> 135  + concrete_int_bag -> 136  + concrete_int_bag -> 137  + concrete_int_bag -> 138  + concrete_int_bag -> 139  + concrete_int_bag -> 140  + concrete_int_bag -> 141  + concrete_int_bag -> 142  + concrete_int_bag -> 143  + concrete_int_bag -> 144  + concrete_int_bag -> 145  + concrete_int_bag -> 146  + concrete_int_bag -> 147  + concrete_int_bag -> 148  + concrete_int_bag -> 149  + concrete_int_bag -> 150  + concrete_int_bag -> 151  + concrete_int_bag -> 152  + concrete_int_bag -> 153  + concrete_int_bag -> 154  + concrete_int_bag -> 155  + concrete_int_bag -> 156  + concrete_int_bag -> 157  + concrete_int_bag -> 158  + concrete_int_bag -> 159  + concrete_int_bag -> 160  + concrete_int_bag -> 161  + concrete_int_bag -> 162  + concrete_int_bag -> 163  + concrete_int_bag -> 164  + concrete_int_bag -> 165  + concrete_int_bag -> 166  + concrete_int_bag -> 167  + concrete_int_bag -> 168  + concrete_int_bag -> 169  + concrete_int_bag -> 170  + concrete_int_bag -> 171  + concrete_int_bag -> 172  + concrete_int_bag -> 173  + concrete_int_bag -> 174  + concrete_int_bag -> 175  + concrete_int_bag -> 176  + concrete_int_bag -> 177  + concrete_int_bag -> 178  + concrete_int_bag -> 179  + concrete_int_bag -> 180  + concrete_int_bag -> 181  + concrete_int_bag -> 182  + concrete_int_bag -> 183  + concrete_int_bag -> 184  + concrete_int_bag -> 185  + concrete_int_bag -> 186  + concrete_int_bag -> 187  + concrete_int_bag -> 188  + concrete_int_bag -> 189  + concrete_int_bag -> 190  + concrete_int_bag -> 191  + concrete_int_bag -> 192  + concrete_int_bag -> 193  + concrete_int_bag -> 194  + concrete_int_bag -> 195  + concrete_int_bag -> 196  + concrete_int_bag -> 197  + concrete_int_bag -> 198  + concrete_int_bag -> 199  + concrete_int_bag -> 200  + concrete_int_bag -> 201  + concrete_int_bag -> 202  + concrete_int_bag -> 203  + concrete_int_bag -> 204  + concrete_int_bag -> 205  + concrete_int_bag -> 206  + concrete_int_bag -> 207  + concrete_int_bag -> 208  + concrete_int_bag -> 209  + concrete_int_bag -> 210  + concrete_int_bag -> 211  + concrete_int_bag -> 212  + concrete_int_bag -> 213  + concrete_int_bag -> 214  + concrete_int_bag -> 216  + concrete_int_bag -> 217  + concrete_int_bag -> 218  + concrete_int_bag -> 219  + concrete_int_bag -> 220  + concrete_int_bag -> 221  + concrete_int_bag -> 222  + concrete_int_bag -> 223  + concrete_int_bag -> 224  + concrete_int_bag -> 225  + concrete_int_bag -> 226  + concrete_int_bag -> 228  + concrete_int_bag -> 229  + concrete_int_bag -> 233  + concrete_int_bag -> 234  + concrete_int_bag -> 235  + concrete_int_bag -> 236  + concrete_int_bag -> 240  + concrete_int_bag -> 241  + concrete_int_bag -> 245  + concrete_int_bag -> 246  + concrete_int_bag -> 257  + concrete_int_bag -> 258  + concrete_int_bag -> 443  + concrete_int_bag -> 444  + concrete_int_bag -> 456  + concrete_int_bag -> 460  + concrete_int_bag -> 461  + concrete_int_bag -> 465  + concrete_int_bag -> 466  + concrete_int_bag -> 467  + concrete_int_bag -> 468  + concrete_int_bag -> 472  + concrete_int_bag -> 473  + concrete_int_bag -> 475  + concrete_int_bag -> 476  + concrete_int_bag -> 477  + concrete_int_bag -> 478  + concrete_int_bag -> 479  + concrete_int_bag -> 480  + concrete_int_bag -> 481  + concrete_int_bag -> 482  + concrete_int_bag -> 483  + concrete_int_bag -> 485  + concrete_int_bag -> 487  + concrete_int_bag -> 488  + concrete_int_bag -> 489  + concrete_int_bag -> 490  + concrete_int_bag -> 491  + concrete_int_bag -> 492  + concrete_int_bag -> 493  + concrete_int_bag -> 494  + concrete_int_bag -> 495  + concrete_int_bag -> 496  + concrete_int_bag -> 497  + concrete_int_bag -> 498  + concrete_int_bag -> 499  + concrete_int_bag -> 500  + concrete_int_bag -> 501  + concrete_int_bag -> 502  + concrete_int_bag -> 503  + concrete_int_bag -> 504  + concrete_int_bag -> 505  + concrete_int_bag -> 506  + concrete_int_bag -> 507  + concrete_int_bag -> 508  + concrete_int_bag -> 509  + concrete_int_bag -> 510  + concrete_int_bag -> 511  + concrete_int_bag -> 512  + concrete_int_bag -> 513  + concrete_int_bag -> 514  + concrete_int_bag -> 515  + concrete_int_bag -> 516  + concrete_int_bag -> 517  + concrete_int_bag -> 518  + concrete_int_bag -> 519  + concrete_int_bag -> 520  + concrete_int_bag -> 521  + concrete_int_bag -> 522  + concrete_int_bag -> 523  + concrete_int_bag -> 524  + concrete_int_bag -> 525  + concrete_int_bag -> 526  + concrete_int_bag -> 527  + concrete_int_bag -> 528  + concrete_int_bag -> 529  + concrete_int_bag -> 530  + concrete_int_bag -> 531  + concrete_int_bag -> 532  + concrete_int_bag -> 533  + concrete_int_bag -> 534  + concrete_int_bag -> 535  + concrete_int_bag -> 536  + concrete_int_bag -> 537  + concrete_int_bag -> 538  + concrete_int_bag -> 539  + concrete_int_bag -> 540  + concrete_int_bag -> 541  + concrete_int_bag -> 542  + concrete_int_bag -> 543  + concrete_int_bag -> 544  + concrete_int_bag -> 545  + concrete_int_bag -> 546  + concrete_int_bag -> 547  + concrete_int_bag -> 548  + concrete_int_bag -> 549  + concrete_int_bag -> 550  + concrete_int_bag -> 551  + concrete_int_bag -> 552  + concrete_int_bag -> 553  + concrete_int_bag -> 554  + concrete_int_bag -> 555  + concrete_int_bag -> 556  + concrete_int_bag -> 557  + concrete_int_bag -> 558  + concrete_int_bag -> 559  + concrete_int_bag -> 560  + concrete_int_bag -> 561  + concrete_int_bag -> 562  + concrete_int_bag -> 563  + concrete_int_bag -> 564  + concrete_int_bag -> 565  + concrete_int_bag -> 566  + concrete_int_bag -> 567  + concrete_int_bag -> 568  + concrete_int_bag -> 569  + concrete_int_bag -> 570  + concrete_int_bag -> 571  + concrete_int_bag -> 572  + concrete_int_bag -> 573  + concrete_int_bag -> 574  + concrete_int_bag -> 575  + concrete_int_bag -> 576  + concrete_int_bag -> 577  + concrete_int_bag -> 578  + concrete_int_bag -> 579  + concrete_int_bag -> 580  + concrete_int_bag -> 581  + concrete_int_bag -> 582  + concrete_int_bag -> 583  + concrete_int_bag -> 584  + concrete_int_bag -> 585  + concrete_int_bag -> 586  + concrete_int_bag -> 587  + concrete_int_bag -> 588  + concrete_int_bag -> 589  + concrete_int_bag -> 590  + concrete_int_bag -> 591  + concrete_int_bag -> 592  + concrete_int_bag -> 593  + concrete_int_bag -> 594  + concrete_int_bag -> 595  + concrete_int_bag -> 596  + concrete_int_bag -> 597  + concrete_int_bag -> 598  + concrete_int_bag -> 599  + concrete_int_bag -> 600  + concrete_int_bag -> 601  + concrete_int_bag -> 602  + concrete_int_bag -> 603  + concrete_int_bag -> 604  + concrete_int_bag -> 605  + concrete_int_bag -> 606  + concrete_int_bag -> 607  + concrete_int_bag -> 608  + concrete_int_bag -> 609  + concrete_int_bag -> 610  + concrete_int_bag -> 611  + concrete_int_bag -> 612  + concrete_int_bag -> 613  + concrete_int_bag -> 614  + concrete_int_bag -> 615  + concrete_int_bag -> 616  + concrete_int_bag -> 617  + concrete_int_bag -> 618  + concrete_int_bag -> 619  + concrete_int_bag -> 620  + concrete_int_bag -> 621  + concrete_int_bag -> 622  + concrete_int_bag -> 623  + concrete_int_bag -> 624  + concrete_int_bag -> 625  + concrete_int_bag -> 626  + concrete_int_bag -> 627  + concrete_int_bag -> 628  + concrete_int_bag -> 629  + concrete_int_bag -> 630  + concrete_int_bag -> 631  + concrete_int_bag -> 632  + concrete_int_bag -> 633  + concrete_int_bag -> 634  + concrete_int_bag -> 635  + concrete_int_bag -> 636  + concrete_int_bag -> 637  + concrete_int_bag -> 638  + concrete_int_bag -> 639  + concrete_int_bag -> 640  + concrete_int_bag -> 641  + concrete_int_bag -> 642  + concrete_int_bag -> 643  + concrete_int_bag -> 644  + concrete_int_bag -> 645  + concrete_int_bag -> 646  + concrete_int_bag -> 647  + concrete_int_bag -> 648  + concrete_int_bag -> 649  + concrete_int_bag -> 650  + concrete_int_bag -> 651  + concrete_int_bag -> 652  + concrete_int_bag -> 653  + concrete_int_bag -> 654  + concrete_int_bag -> 655  + concrete_int_bag -> 656  + concrete_int_bag -> 657  + concrete_int_bag -> 658  + concrete_int_bag -> 659  + concrete_int_bag -> 660  + concrete_int_bag -> 661  + concrete_int_bag -> 662  + concrete_int_bag -> 663  + concrete_int_bag -> 664  + concrete_int_bag -> 665  + concrete_int_bag -> 666  + concrete_int_bag -> 667  + concrete_int_bag -> 668  + concrete_int_bag -> 669  + concrete_int_bag -> 670  + concrete_int_bag -> 671  + concrete_int_bag -> 672  + concrete_int_bag -> 673  + concrete_int_bag -> 674  + concrete_int_bag -> 675  + concrete_int_bag -> 676  + concrete_int_bag -> 677  + concrete_int_bag -> 678  + concrete_int_bag -> 679  + concrete_int_bag -> 680  + concrete_int_bag -> 681  + concrete_int_bag -> 682  + concrete_int_bag -> 683  + concrete_int_bag -> 684  + concrete_int_bag -> 685  + concrete_int_bag -> 686  + concrete_int_bag -> 687  + concrete_int_bag -> 688  + concrete_int_bag -> 689  + concrete_int_bag -> 690  + concrete_int_bag -> 691  + concrete_int_bag -> 692  + concrete_int_bag -> 693  + concrete_int_bag -> 694  + concrete_int_bag -> 695  + concrete_int_bag -> 696  + concrete_int_bag -> 697  + concrete_int_bag -> 698  + concrete_int_bag -> 700  + concrete_int_bag -> 701  + concrete_int_bag -> 702  + concrete_int_bag -> 703  + concrete_int_bag -> 704  + concrete_int_bag -> 705  + concrete_int_bag -> 706  + concrete_int_bag -> 707  + concrete_int_bag -> 708  + concrete_int_bag -> 709  + concrete_int_bag -> 710  + concrete_int_bag -> 712  + concrete_int_bag -> 713  + concrete_int_bag -> 717  + concrete_int_bag -> 718  + concrete_int_bag -> 719  + concrete_int_bag -> 720  + concrete_int_bag -> 724  + concrete_int_bag -> 725  + concrete_int_bag -> 729  + concrete_int_bag -> 730  + concrete_int_bag -> 741  + concrete_int_bag -> 742  + concrete_int_bag -> 927  + concrete_int_bag -> 928  + concrete_int_bag -> 939  + concrete_int_bag -> 940  + concrete_int_bag -> 944  + concrete_int_bag -> 945  + concrete_int_bag -> 949  + concrete_int_bag -> 950  + concrete_int_bag -> 951  + concrete_int_bag -> 952  + concrete_int_bag -> 956  + concrete_int_bag -> 957  + concrete_int_bag -> 959  + concrete_int_bag -> 960  + concrete_int_bag -> 961  + concrete_int_bag -> 962  + concrete_int_bag -> 963  + concrete_int_bag -> 964  + concrete_int_bag -> 965  + concrete_int_bag -> 966  + concrete_int_bag -> 967  + concrete_int_bag -> 968  + concrete_int_bag -> 969  + concrete_int_bag -> 971  + concrete_int_bag -> 972  + concrete_int_bag -> 973  + concrete_int_bag -> 974  + concrete_int_bag -> 975  + concrete_int_bag -> 976  + concrete_int_bag -> 977  + concrete_int_bag -> 978  + concrete_int_bag -> 979  + concrete_int_bag -> 980  + concrete_int_bag -> 981  + concrete_int_bag -> 982  + concrete_int_bag -> 983  + concrete_int_bag -> 984  + concrete_int_bag -> 985  + concrete_int_bag -> 986  + concrete_int_bag -> 987  + concrete_int_bag -> 988  + concrete_int_bag -> 989  + concrete_int_bag -> 990  + concrete_int_bag -> 991  + concrete_int_bag -> 992  + concrete_int_bag -> 993  + concrete_int_bag -> 994  + concrete_int_bag -> 995  + concrete_int_bag -> 996  + concrete_int_bag -> 997  + concrete_int_bag -> 998  + concrete_int_bag -> 999  + concrete_int_bag -> 1000  + concrete_int_bag -> 1001  + concrete_int_bag -> 1002  + concrete_int_bag -> 1003  + concrete_int_bag -> 1004  + concrete_int_bag -> 1005  + concrete_int_bag -> 1006  + concrete_int_bag -> 1007  + concrete_int_bag -> 1008  + concrete_int_bag -> 1009  + concrete_int_bag -> 1010  + concrete_int_bag -> 1011  + concrete_int_bag -> 1012  + concrete_int_bag -> 1013  + concrete_int_bag -> 1014  + concrete_int_bag -> 1015  + concrete_int_bag -> 1016  + concrete_int_bag -> 1017  + concrete_int_bag -> 1018  + concrete_int_bag -> 1019  + concrete_int_bag -> 1020  + concrete_int_bag -> 1021  + concrete_int_bag -> 1022  + concrete_int_bag -> 1023  + concrete_int_bag -> 1024  + concrete_int_bag -> 1025  + concrete_int_bag -> 1026  + concrete_int_bag -> 1027  + concrete_int_bag -> 1028  + concrete_int_bag -> 1029  + concrete_int_bag -> 1030  + concrete_int_bag -> 1031  + concrete_int_bag -> 1032  + concrete_int_bag -> 1033  + concrete_int_bag -> 1034  + concrete_int_bag -> 1035  + concrete_int_bag -> 1036  + concrete_int_bag -> 1037  + concrete_int_bag -> 1038  + concrete_int_bag -> 1039  + concrete_int_bag -> 1040  + concrete_int_bag -> 1041  + concrete_int_bag -> 1042  + concrete_int_bag -> 1043  + concrete_int_bag -> 1044  + concrete_int_bag -> 1045  + concrete_int_bag -> 1046  + concrete_int_bag -> 1047  + concrete_int_bag -> 1048  + concrete_int_bag -> 1049  + concrete_int_bag -> 1050  + concrete_int_bag -> 1051  + concrete_int_bag -> 1052  + concrete_int_bag -> 1053  + concrete_int_bag -> 1054  + concrete_int_bag -> 1055  + concrete_int_bag -> 1056  + concrete_int_bag -> 1057  + concrete_int_bag -> 1058  + concrete_int_bag -> 1059  + concrete_int_bag -> 1060  + concrete_int_bag -> 1061  + concrete_int_bag -> 1062  + concrete_int_bag -> 1063  + concrete_int_bag -> 1064  + concrete_int_bag -> 1065  + concrete_int_bag -> 1066  + concrete_int_bag -> 1067  + concrete_int_bag -> 1068  + concrete_int_bag -> 1069  + concrete_int_bag -> 1070  + concrete_int_bag -> 1071  + concrete_int_bag -> 1072  + concrete_int_bag -> 1073  + concrete_int_bag -> 1074  + concrete_int_bag -> 1075  + concrete_int_bag -> 1076  + concrete_int_bag -> 1077  + concrete_int_bag -> 1078  + concrete_int_bag -> 1079  + concrete_int_bag -> 1080  + concrete_int_bag -> 1081  + concrete_int_bag -> 1082  + concrete_int_bag -> 1083  + concrete_int_bag -> 1084  + concrete_int_bag -> 1085  + concrete_int_bag -> 1086  + concrete_int_bag -> 1087  + concrete_int_bag -> 1088  + concrete_int_bag -> 1089  + concrete_int_bag -> 1090  + concrete_int_bag -> 1091  + concrete_int_bag -> 1092  + concrete_int_bag -> 1093  + concrete_int_bag -> 1094  + concrete_int_bag -> 1095  + concrete_int_bag -> 1096  + concrete_int_bag -> 1097  + concrete_int_bag -> 1098  + concrete_int_bag -> 1099  + concrete_int_bag -> 1100  + concrete_int_bag -> 1101  + concrete_int_bag -> 1102  + concrete_int_bag -> 1103  + concrete_int_bag -> 1104  + concrete_int_bag -> 1105  + concrete_int_bag -> 1106  + concrete_int_bag -> 1107  + concrete_int_bag -> 1108  + concrete_int_bag -> 1109  + concrete_int_bag -> 1110  + concrete_int_bag -> 1111  + concrete_int_bag -> 1112  + concrete_int_bag -> 1113  + concrete_int_bag -> 1114  + concrete_int_bag -> 1115  + concrete_int_bag -> 1116  + concrete_int_bag -> 1117  + concrete_int_bag -> 1118  + concrete_int_bag -> 1119  + concrete_int_bag -> 1120  + concrete_int_bag -> 1121  + concrete_int_bag -> 1122  + concrete_int_bag -> 1123  + concrete_int_bag -> 1124  + concrete_int_bag -> 1125  + concrete_int_bag -> 1126  + concrete_int_bag -> 1127  + concrete_int_bag -> 1128  + concrete_int_bag -> 1129  + concrete_int_bag -> 1130  + concrete_int_bag -> 1131  + concrete_int_bag -> 1132  + concrete_int_bag -> 1133  + concrete_int_bag -> 1134  + concrete_int_bag -> 1135  + concrete_int_bag -> 1136  + concrete_int_bag -> 1137  + concrete_int_bag -> 1138  + concrete_int_bag -> 1139  + concrete_int_bag -> 1140  + concrete_int_bag -> 1141  + concrete_int_bag -> 1142  + concrete_int_bag -> 1143  + concrete_int_bag -> 1144  + concrete_int_bag -> 1145  + concrete_int_bag -> 1146  + concrete_int_bag -> 1147  + concrete_int_bag -> 1148  + concrete_int_bag -> 1149  + concrete_int_bag -> 1150  + concrete_int_bag -> 1151  + concrete_int_bag -> 1152  + concrete_int_bag -> 1153  + concrete_int_bag -> 1155  + concrete_int_bag -> 1156  + concrete_int_bag -> 1157  + concrete_int_bag -> 1158  + concrete_int_bag -> 1159  + concrete_int_bag -> 1160  + concrete_int_bag -> 1161  + concrete_int_bag -> 1162  + concrete_int_bag -> 1163  + concrete_int_bag -> 1164  + concrete_int_bag -> 1165  + concrete_int_bag -> 1167  + concrete_int_bag -> 1168  + concrete_int_bag -> 1172  + concrete_int_bag -> 1173  + concrete_int_bag -> 1174  + concrete_int_bag -> 1175  + concrete_int_bag -> 1179  + concrete_int_bag -> 1180  + concrete_int_bag -> 1184  + concrete_int_bag -> 1185  + concrete_int_bag -> 1196  + concrete_int_bag -> 1197  + concrete_int_bag -> -11 
   , c4_AbstractElement in partial_c4_AbstractElement
   , c11_ElementA in partial_c11_ElementA
   , c17_ElementB in partial_c17_ElementB
   , c23_ElementC in partial_c23_ElementC
   , c29_AbstractIterator in partial_c29_AbstractIterator
   , c35_ForwardIterator in partial_c35_ForwardIterator
   , c41_BackwardIterator in partial_c41_BackwardIterator
   , c47_AbstractSort in partial_c47_AbstractSort
   , c53_BubbleSort in partial_c53_BubbleSort
   , c59_MergeSort in partial_c59_MergeSort
   , c65_InsertionSort in partial_c65_InsertionSort
   , c71_QuickSort in partial_c71_QuickSort
   , c77_print in partial_c77_print
   , c83_Measurement in partial_c83_Measurement
   , c91_TCP_IP in partial_c91_TCP_IP
   , c97_SyntheticPerformanceOrMemorySize in partial_c97_SyntheticPerformanceOrMemorySize
   , c103_Performance in partial_c103_Performance
   , c109_MemorySize in partial_c109_MemorySize
   , c115_Base in partial_c115_Base
    ,  c2_footprint in footprint_for_c4_AbstractElement_of_minus12 + footprint_for_c11_ElementA_of_12 + footprint_for_c17_ElementB_of_0 + footprint_for_c23_ElementC_of_0 + footprint_for_c29_AbstractIterator_of_0 + footprint_for_c35_ForwardIterator_of_0 + footprint_for_c41_BackwardIterator_of_1 + footprint_for_c47_AbstractSort_of_57 + footprint_for_c53_BubbleSort_of_17 + footprint_for_c59_MergeSort_of_32 + footprint_for_c65_InsertionSort_of_0 + footprint_for_c71_QuickSort_of_22 + footprint_for_c77_print_of_44 + footprint_for_c83_Measurement_of_484 + footprint_for_c91_TCP_IP_of_0 + footprint_for_c97_SyntheticPerformanceOrMemorySize_of_0 + footprint_for_c103_Performance_of_37 + footprint_for_c109_MemorySize_of_36 + footprint_for_c115_Base_of_455
    , r_c2_footprint in partial_c4_AbstractElement->footprint_for_c4_AbstractElement_of_minus12 + partial_c11_ElementA->footprint_for_c11_ElementA_of_12 + partial_c17_ElementB->footprint_for_c17_ElementB_of_0 + partial_c23_ElementC->footprint_for_c23_ElementC_of_0 + partial_c29_AbstractIterator->footprint_for_c29_AbstractIterator_of_0 + partial_c35_ForwardIterator->footprint_for_c35_ForwardIterator_of_0 + partial_c41_BackwardIterator->footprint_for_c41_BackwardIterator_of_1 + partial_c47_AbstractSort->footprint_for_c47_AbstractSort_of_57 + partial_c53_BubbleSort->footprint_for_c53_BubbleSort_of_17 + partial_c59_MergeSort->footprint_for_c59_MergeSort_of_32 + partial_c65_InsertionSort->footprint_for_c65_InsertionSort_of_0 + partial_c71_QuickSort->footprint_for_c71_QuickSort_of_22 + partial_c77_print->footprint_for_c77_print_of_44 + partial_c83_Measurement->footprint_for_c83_Measurement_of_484 + partial_c91_TCP_IP->footprint_for_c91_TCP_IP_of_0 + partial_c97_SyntheticPerformanceOrMemorySize->footprint_for_c97_SyntheticPerformanceOrMemorySize_of_0 + partial_c103_Performance->footprint_for_c103_Performance_of_37 + partial_c109_MemorySize->footprint_for_c109_MemorySize_of_36 + partial_c115_Base->footprint_for_c115_Base_of_455
    , c2_footprint_ref in footprint_for_c4_AbstractElement_of_minus12-> -12 + footprint_for_c11_ElementA_of_12-> 12 + footprint_for_c17_ElementB_of_0-> 0 + footprint_for_c23_ElementC_of_0-> 0 + footprint_for_c29_AbstractIterator_of_0-> 0 + footprint_for_c35_ForwardIterator_of_0-> 0 + footprint_for_c41_BackwardIterator_of_1-> 1 + footprint_for_c47_AbstractSort_of_57-> 57 + footprint_for_c53_BubbleSort_of_17-> 17 + footprint_for_c59_MergeSort_of_32-> 32 + footprint_for_c65_InsertionSort_of_0-> 0 + footprint_for_c71_QuickSort_of_22-> 22 + footprint_for_c77_print_of_44-> 44 + footprint_for_c83_Measurement_of_484-> 484 + footprint_for_c91_TCP_IP_of_0-> 0 + footprint_for_c97_SyntheticPerformanceOrMemorySize_of_0-> 0 + footprint_for_c103_Performance_of_37-> 37 + footprint_for_c109_MemorySize_of_36-> 36 + footprint_for_c115_Base_of_455-> 455
}
run show for partial_speedup optimize o_global
