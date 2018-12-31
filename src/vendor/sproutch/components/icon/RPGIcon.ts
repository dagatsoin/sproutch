/**
 * RPGIcon icon set component.
 * Usage: <RPGIcon name="icon-name" size={20} color="#4F8EF7" />
 */
import createIconSet from 'react-native-vector-icons/dist/lib/create-icon-set'
const glyphMap = {
  "acid": 59648,
  "zigzag-leaf": 60142,
  "archer": 59661,
  "archery-target": 59662,
  "arena": 59663,
  "aries": 59664,
  "arrow-cluster": 59665,
  "arrow-flights": 59666,
  "arson": 59667,
  "aura": 59668,
  "aware": 59669,
  "axe": 59671,
  "axe-swing": 59670,
  "ball": 59672,
  "barbed-arrow": 59673,
  "barrier": 59674,
  "bat-sword": 59675,
  "battered-axe": 59676,
  "batteries": 59677,
  "battery-0": 59678,
  "battery-25": 59679,
  "battery-50": 59680,
  "battery-75": 59681,
  "battery-100": 59682,
  "battery-black": 59683,
  "battery-negative": 59684,
  "battery-positive": 59685,
  "battery-white": 59686,
  "batwings": 59687,
  "beam-wake": 59688,
  "bear-trap": 59689,
  "beer": 59690,
  "beetle": 59691,
  "bell": 59692,
  "biohazard": 59693,
  "bird-claw": 59694,
  "bird-mask": 59695,
  "blade-bite": 59696,
  "blast": 59697,
  "blaster": 59698,
  "bleeding-eye": 59699,
  "bleeding-hearts": 59700,
  "bolt-shield": 59701,
  "bomb-explosion": 59702,
  "bombs": 59703,
  "bone-bite": 59704,
  "bone-knife": 59705,
  "book": 59706,
  "boomerang": 59707,
  "boot-stomp": 59708,
  "bottle-vapors": 59709,
  "bottled-bolt": 59710,
  "bottom-right": 59711,
  "bowie-knife": 59712,
  "bowling-pin": 59713,
  "brain-freeze": 59714,
  "brandy-bottle": 59715,
  "bridge": 59716,
  "broadhead-arrow": 59717,
  "sword": 59718,
  "broadsword": 59718,
  "broken-bone": 59719,
  "broken-bottle": 59720,
  "broken-heart": 59720,
  "broken-shield": 59722,
  "broken-skull": 59723,
  "bubbling-potion": 59724,
  "bullets": 59725,
  "burning-book": 59726,
  "burning-embers": 59727,
  "burning-eye": 59728,
  "burning-meteor": 59729,
  "burst-blob": 59730,
  "butterfly": 59731,
  "campfire": 59732,
  "cancel": 59733,
  "cancer": 59734,
  "candle": 59736,
  "candle-fire": 59735,
  "cannon-shot": 59737,
  "capitol": 59738,
  "capricorn": 59739,
  "carrot": 59740,
  "castle-emblem": 59741,
  "castle-flag": 59742,
  "cat": 59743,
  "chain": 59744,
  "cheese": 59745,
  "chemical-arrow": 59746,
  "chessboard": 59747,
  "chicken-leg": 59748,
  "circle-of-circles": 59749,
  "circular-saw": 59750,
  "circular-shield": 59751,
  "cloak-and-dagger": 59752,
  "clockwork": 59753,
  "clover": 59754,
  "clovers": 59756,
  "clovers-card": 59755,
  "cluster-bomb": 59757,
  "coffee-mug": 59758,
  "cog": 59760,
  "cog-wheel": 59759,
  "cold-heart": 59761,
  "compass": 59762,
  "corked-tube": 59763,
  "crab-claw": 59764,
  "cracked-helm": 59765,
  "cracked-shield": 59766,
  "croc-sword": 59767,
  "crossbow": 59768,
  "crossed-axes": 59769,
  "crossed-bones": 59770,
  "crossed-pistols": 59771,
  "crossed-sabres": 59772,
  "crossed-swords": 59773,
  "crown": 59775,
  "crown-of-thorns": 59774,
  "crowned-heart": 59776,
  "crush": 59777,
  "crystal-ball": 59778,
  "crystal-cluster": 59779,
  "crystal-wand": 59780,
  "crystals": 59781,
  "cubes": 59782,
  "cut-palm": 59783,
  "cycle": 59784,
  "daggers": 59785,
  "daisy": 59786,
  "dead-tree": 59787,
  "death-skull": 59788,
  "decapitation": 59789,
  "defibrilate": 59790,
  "demolish": 59791,
  "dervish-swords": 59792,
  "desert-skull": 59793,
  "diamond": 59794,
  "diamonds": 59796,
  "diamonds-card": 59795,
  "dice-five": 59797,
  "dice-four": 59798,
  "dice-one": 59799,
  "dice-six": 59800,
  "dice-three": 59801,
  "dice-two": 59802,
  "dinosaur": 59803,
  "divert": 59804,
  "diving-dagger": 59805,
  "double-team": 59806,
  "doubled": 59807,
  "dragon": 59810,
  "dragon-breath": 59808,
  "dragon-wing": 59809,
  "dragonfly": 59811,
  "drill": 59812,
  "dripping-blade": 59813,
  "dripping-knife": 59814,
  "dripping-sword": 59815,
  "droplet": 59817,
  "droplet-splash": 59816,
  "droplets": 59818,
  "duel": 59819,
  "egg": 59821,
  "egg-pod": 59820,
  "eggplant": 59822,
  "emerald": 59823,
  "energise": 59824,
  "explosion": 59825,
  "explosive-materials": 59826,
  "eye-monster": 59827,
  "eye-shield": 59828,
  "eyeball": 59829,
  "fairy": 59831,
  "fairy-wand": 59830,
  "fall-down": 59832,
  "falling": 59833,
  "fast-ship": 59834,
  "feather-wing": 59835,
  "feathered-wing": 59836,
  "fedora": 59837,
  "fire": 59843,
  "fire-bomb": 59838,
  "fire-breath": 59839,
  "fire-ring": 59840,
  "fire-shield": 59841,
  "fire-symbol": 59842,
  "fireball-sword": 59844,
  "fish": 59845,
  "fizzing-flask": 59846,
  "flame-symbol": 59847,
  "flaming-arrow": 59848,
  "flaming-claw": 59849,
  "flaming-trident": 59850,
  "flask": 59851,
  "flat-hammer": 59852,
  "flower": 59853,
  "flowers": 59854,
  "fluffy-swirl": 59855,
  "focused-lightning": 59856,
  "food-chain": 59857,
  "footprint": 59858,
  "forging": 59859,
  "forward": 59860,
  "fox": 59861,
  "frost-emblem": 59862,
  "frostfire": 59863,
  "frozen-arrow": 59864,
  "gamepad-cross": 59865,
  "gavel": 59866,
  "gear-hammer": 59867,
  "gear-heart": 59868,
  "gears": 59869,
  "gecko": 59870,
  "gem": 59872,
  "gem-pendant": 59871,
  "gemini": 59873,
  "glass-heart": 59874,
  "gloop": 59875,
  "gold-bar": 59876,
  "grappling-hook": 59877,
  "grass": 59879,
  "grass-patch": 59878,
  "grenade": 59880,
  "groundbreaker": 59881,
  "guarded-tower": 59882,
  "guillotine": 59883,
  "halberd": 59884,
  "hammer": 59886,
  "hammer-drop": 59885,
  "hand": 59889,
  "hand-emblem": 59887,
  "hand-saw": 59888,
  "harpoon-trident": 59890,
  "health": 59893,
  "health-decrease": 59891,
  "health-increase": 59892,
  "heart-bottle": 59894,
  "heart-tower": 59895,
  "heartburn": 59896,
  "hearts": 59898,
  "hearts-card": 59897,
  "heat-haze": 59899,
  "heavy-fall": 59900,
  "heavy-shield": 59901,
  "helmet": 59902,
  "help": 59903,
  "hive-emblem": 59904,
  "hole-ladder": 59905,
  "honeycomb": 59906,
  "hood": 59907,
  "horn-call": 59908,
  "horns": 59909,
  "horseshoe": 59910,
  "hospital-cross": 59911,
  "hot-surface": 59912,
  "hourglass": 59913,
  "hydra": 59915,
  "hydra-shot": 59914,
  "ice-cube": 59916,
  "implosion": 59917,
  "incense": 59918,
  "insect-jaws": 59919,
  "interdiction": 59920,
  "jetpack": 59921,
  "jigsaw-piece": 59922,
  "kaleidoscope": 59923,
  "kettlebell": 59924,
  "key": 59926,
  "key-basic": 59925,
  "kitchen-knives": 59927,
  "knife": 59929,
  "knife-fork": 59928,
  "knight-helmet": 59930,
  "kunai": 59931,
  "lantern-flame": 59932,
  "large-hammer": 59933,
  "laser-blast": 59934,
  "laser-site": 59935,
  "lava": 59936,
  "leaf": 59937,
  "leo": 59938,
  "level-four": 59940,
  "level-four-advanced": 59939,
  "level-three": 59942,
  "level-three-advanced": 59941,
  "level-two": 59944,
  "level-two-advanced": 59943,
  "lever": 59945,
  "libra": 59946,
  "light-bulb": 59947,
  "lighthouse": 59948,
  "lightning": 59953,
  "lightning-bolt": 59949,
  "lightning-storm": 59950,
  "lightning-sword": 59951,
  "lightning-trio": 59952,
  "lion": 59954,
  "lit-candelabra": 59955,
  "load": 59956,
  "locked-fortress": 59957,
  "love-howl": 59958,
  "maggot": 59959,
  "magnet": 59960,
  "mass-driver": 59961,
  "match": 59962,
  "meat": 59964,
  "meat-hook": 59963,
  "medical-pack": 59965,
  "metal-gate": 59966,
  "microphone": 59967,
  "mine-wagon": 59968,
  "mining-diamonds": 59969,
  "mirror": 59970,
  "monster-skull": 59971,
  "montains": 59972,
  "moon-sun": 59973,
  "mp5": 59974,
  "muscle-fat": 59975,
  "muscle-up": 59976,
  "musket": 59977,
  "nails": 59978,
  "nodular": 59979,
  "noose": 59980,
  "nuclear": 59981,
  "ocarina": 59982,
  "ocean-emblem": 59983,
  "octopus": 59984,
  "omega": 59985,
  "on-target": 59986,
  "ophiuchus": 59987,
  "overhead": 59988,
  "overmind": 59989,
  "palm-tree": 59990,
  "pawn": 59991,
  "pawprint": 59992,
  "perspective-dice-five": 59993,
  "perspective-dice-four": 59994,
  "perspective-dice-one": 59995,
  "perspective-dice-random": 59996,
  "perspective-dice-six": 59998,
  "perspective-dice-six-two": 59998,
  "perspective-dice-three": 59999,
  "pill": 60000,
  "pills": 60001,
  "pine-tree": 60002,
  "ping-pong": 60003,
  "pisces": 60004,
  "plain-dagger": 60005,
  "player": 60015,
  "player-despair": 60006,
  "player-dodge": 60007,
  "player-king": 60008,
  "player-lift": 60009,
  "player-pain": 60010,
  "player-pyromaniac": 60011,
  "player-shot": 60012,
  "player-teleport": 60013,
  "player-thunder-struck": 60014,
  "podium": 60016,
  "poison-cloud": 60017,
  "potion": 60018,
  "pyramids": 60019,
  "queen-crown": 60020,
  "quill-ink": 60021,
  "rabbit": 60022,
  "radar-dish": 60023,
  "radial-balance": 60024,
  "radioactive": 60025,
  "raven": 60026,
  "reactor": 60027,
  "recycle": 60028,
  "regeneration": 60029,
  "relic-blade": 60030,
  "repair": 60031,
  "reverse": 60032,
  "revolver": 60033,
  "rifle": 60034,
  "ringing-bell": 60035,
  "roast-chicken": 60036,
  "robot-arm": 60037,
  "round-bottom-flask": 60038,
  "round-shield": 60039,
  "rss": 60040,
  "rune-stone": 60041,
  "sagittarius": 60042,
  "sapphire": 60043,
  "sattelite": 60044,
  "save": 60045,
  "scorpio": 60046,
  "scroll-unfurled": 60047,
  "scythe": 60048,
  "sea-serpent": 60049,
  "seagull": 60050,
  "shark": 60051,
  "sheep": 60052,
  "sherif": 60053,
  "shield": 60054,
  "ship-emblem": 60055,
  "shoe-prints": 60056,
  "shot-through-the-heart": 60057,
  "shotgun-shell": 60058,
  "shovel": 60059,
  "shuriken": 60060,
  "sickle": 60061,
  "sideswipe": 60062,
  "site": 60063,
  "skull": 60065,
  "skull-trophy": 60064,
  "slash-ring": 60066,
  "small-fire": 60067,
  "snail": 60068,
  "snake": 60069,
  "snorkel": 60070,
  "snowflake": 60071,
  "soccer-ball": 60072,
  "spades": 60074,
  "spades-card": 60073,
  "spawn-node": 60075,
  "spear-head": 60076,
  "speech-bubble": 60077,
  "speech-bubbles": 60078,
  "spider-face": 60079,
  "spikeball": 60080,
  "spiked-mace": 60081,
  "spiked-tentacle": 60082,
  "spinning-sword": 60083,
  "spiral-shell": 60084,
  "splash": 60085,
  "spray-can": 60086,
  "sprout": 60088,
  "sprout-emblem": 60087,
  "stopwatch": 60089,
  "suckered-tentacle": 60090,
  "suits": 60091,
  "sun": 60093,
  "sun-symbol": 60092,
  "sunbeams": 60094,
  "super-mushroom": 60095,
  "supersonic-arrow": 60096,
  "surveillance-camera": 60097,
  "syringe": 60098,
  "target-arrows": 60099,
  "target-laser": 60100,
  "targeted": 60101,
  "taurus": 60102,
  "telescope": 60103,
  "tentacle": 60104,
  "tesla": 60105,
  "thorn-arrow": 60106,
  "thorny-vine": 60107,
  "three-keys": 60108,
  "tic-tac-toe": 60109,
  "toast": 60110,
  "tombstone": 60111,
  "tooth": 60112,
  "torch": 60113,
  "tower": 60114,
  "trail": 60115,
  "trefoil-lily": 60116,
  "trident": 60117,
  "triforce": 60118,
  "trophy": 60119,
  "turd": 60120,
  "two-dragons": 60121,
  "two-hearts": 60122,
  "uncertainty": 60123,
  "underhand": 60124,
  "unplugged": 60125,
  "vase": 60126,
  "venomous-snake": 60127,
  "vest": 60128,
  "vial": 60129,
  "vine-whip": 60130,
  "virgo": 60131,
  "water-drop": 60132,
  "wifi": 60133,
  "wireless-signal": 60134,
  "wolf-head": 60135,
  "wolf-howl": 60136,
  "wooden-sign": 60137,
  "wrench": 60138,
  "wyvern": 60139,
  "x-mark": 60140,
  "zebra-shield": 60141,
  "arcane-mask": 59660,
  "aquarius": 59659,
  "apple": 59658,
  "anvil": 59657,
  "ankh": 59656,
  "angel-wings": 59655,
  "anchor": 59654,
  "ammo-bag": 59653,
  "alligator-clip": 59652,
  "all-for-one": 59651,
  "alien-fire": 59650,
  "acorn": 59649
}

const iconSet = createIconSet(glyphMap, 'RPGAwesome')

export default iconSet

export const Button = iconSet.Button
export const TabBarItem = iconSet.TabBarItem
export const TabBarItemIOS = iconSet.TabBarItemIOS
export const ToolbarAndroid = iconSet.ToolbarAndroid
export const getImageSource = iconSet.getImageSource